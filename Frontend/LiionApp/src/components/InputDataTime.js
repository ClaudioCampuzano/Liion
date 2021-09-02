//https://www.youtube.com/watch?v=lpIEpggB6o4
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS, hp, wp } from "../constants/styleThemes";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const InputDataTime = (props) => {
  const {
    label,
    errorText,
    style,
    onBlur,
    onFocus,
    secureTextEntry,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState(moment());

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue:
        isFocused || date.format("YYYY-MM-DD") != moment().format("YYYY-MM-DD")
          ? 1
          : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, date]);

  let color = isFocused ? COLORS.TURKEY : COLORS.LEAD;
  if (errorText) {
    color = "#B00020";
  }

  const onChange = (e, selectedDate) => {
    setIsFocused(false);

    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(moment(currentDate));
      props.onDataChange(moment(currentDate));
    }
  };
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={() => setIsFocused(true)}>
        <Text
          style={[
            styles.input,
            {
              borderColor: color,
              height: hp("8.4%"),
            },
          ]}
          {...restOfProps}
        >
          {console.log(date.utc())}
          {!(date.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) &&
            date.utc().format("YYYY-MM-DD")}
        </Text>
      </TouchableWithoutFeedback>

      {isFocused && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={new Date(date)}
          mode="date"
          locale="es-ES"
          display="default"
          onChange={onChange}
          maximumDate={
            new Date(moment().subtract(18, "years").format("YYYY-MM-DD"))
          }
          minimumDate={
            new Date(moment().subtract(100, "years").format("YYYY-MM-DD"))
          }
        />
      )}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color,
              },
            ]}
          >
            {label}
            {errorText ? "*" : ""}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

InputDataTime.defaultProps = {
  onDataChange: () => {},
};

export default InputDataTime;

const styles = StyleSheet.create({
  input: {
    padding: hp("2.7%"),
    borderWidth: 1,
    borderRadius: 17,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.8%"),
    color: COLORS.TURKEY,
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: COLORS.WHITE,
  },
  label: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("1.8%"),
  },
  error: {
    marginTop: hp("0.5%"),
    marginLeft: wp("2.3%"),
    fontSize: hp("1.4%"),
    color: "#B00020",
    fontFamily: "Gotham-SSm-Medium",
  },
});
