//https://www.youtube.com/watch?v=lpIEpggB6o4
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
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

const InputDateTime = (props) => {
  const {
    label,
    style,
    onBlur,
    errorText,
    onFocus,
    maximum,
    minimum,
    mode,
    ...restOfProps
  } = props;

  const defaultDate = useRef(moment());

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState(defaultDate.current);

  const [showLabel, SetShowLabel] = useState(false);

  const [limits, setLimits] = useState({
    maximumDate: new Date(
      moment().subtract(maximum, "days").format("YYYY-MM-DD")
    ),
    minimumDate: new Date(
      moment().subtract(minimum, "days").format("YYYY-MM-DD")
    ),
  });

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || date != defaultDate.current ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, date]);

  const onChange = (e, selectedDate) => {
    setIsFocused(false);
    if (selectedDate) {
      SetShowLabel(true);
      const currentDate = selectedDate || date;
      setDate(moment(currentDate));
      props.onDataChange(moment(currentDate));
    } else {
      console.log("no valido");
      console.log(date.local().format("DD/MM/YYYY HH:mm"));
      console.log(defaultDate.current.local().format("DD/MM/YYYY HH:mm"));
      SetShowLabel(false);
    }
  };

  let color = isFocused ? COLORS.TURKEY : COLORS.LEAD;
  let colorText = isFocused ? COLORS.TURKEY : COLORS.BORDER_COLOR;

  if (errorText) {
    color = COLORS.WARN_RED;
    colorText = COLORS.WARN_RED;
  }

  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={() => setIsFocused(true)}>
        <Text
          style={[
            styles.input,
            {
              borderColor: colorText,
              height: hp("8.4%"),
            },
          ]}
          {...restOfProps}
        >
          {showLabel &&
            (mode === "date"
              ? date.local().format("DD/MM/YYYY")
              : date.local().format("HH:mm"))}
        </Text>
      </TouchableWithoutFeedback>

      {isFocused && (
        <DateTimePicker
          style={{}}
          value={new Date(date)}
          mode={mode}
          locale="es-ES"
          display="default"
          onChange={onChange}
          is24Hour={true}
          maximumDate={limits.maximumDate}
          minimumDate={limits.minimumDate}
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
                    outputRange: [15, -18],
                  }),
                },
              ],
            },
          ]}
        >
          {showLabel ? (
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
          ) : (
            <Text
              style={[
                styles.label,
                {
                  color,
                  position: "absolute",
                },
                isFocused && { position: "relative" },
              ]}
            >
              {label}
              {errorText ? "*" : ""}
            </Text>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

InputDateTime.defaultProps = {
  onDataChange: () => {},
};

export default InputDateTime;

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
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.8%"),
  },
  error: {
    marginTop: hp("0.5%"),
    marginLeft: wp("2.3%"),
    fontSize: hp("1.4%"),
    color: COLORS.WARN_RED,
    fontFamily: "Gotham-SSm-Medium",
  },
});
