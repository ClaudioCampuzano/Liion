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

import SelectDropdown from "react-native-select-dropdown";

const InputPicker = (props) => {
  const {
    label,
    style,
    value,
    errorText,
    onValueChange,
    data,
    height,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showLabel, SetShowLabel] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: showLabel || value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, value]);

  useEffect(() => {
    value != "" && SetShowLabel(true);
  }, [value]);

  let colorInput = showLabel ? COLORS.TURKEY : COLORS.LEAD;
  let color = COLORS.LEAD;
  let colorBorder = isFocused ? COLORS.TURKEY : COLORS.BORDER_COLOR;

  if (errorText) {
    color = COLORS.WARN_RED;
    colorInput = COLORS.WARN_RED;
    colorBorder = COLORS.WARN_RED;
  }

  return (
    <View style={style}>
      <View
        style={[styles.input, { borderColor: colorBorder}, height && {height: height}]}
      >
        <SelectDropdown
          data={data}
          defaultButtonText={label}
          {...restOfProps}
          rowStyle={{ backgroundColor: "white", width: style.width }}
          rowTextStyle={{
            fontFamily: "Gotham-SSm-Medium",
            fontSize: hp("1.8%"),
            color: COLORS.LEAD,
            textAlign: "left",
          }}
          buttonStyle={{
            backgroundColor: "white",
            width: style.width - wp(2.5),
            borderRadius: 17,
          }}
          buttonTextStyle={{
            fontFamily: "Gotham-SSm-Medium",
            fontSize: hp("1.8%"),
            color: colorInput,
            textAlign: "left",
            marginLeft: 0,
          }}
          //dropdownOverlayColor={"transparent"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

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
                    outputRange: [15, -5],
                  }),
                },
              ],
            },
          ]}
        >
          {showLabel && (
            <Text
              style={[
                styles.label,
                {
                  color,
                  backgroundColor: "transparent",
                },
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

export default InputPicker;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 17,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.8%"),
    color: COLORS.TURKEY,
    height: hp("8.4%"),
    justifyContent: "center",
    backgroundColor: "white",
    paddingLeft: wp(1.5),
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
  picker: {
    width: wp(70),
    backgroundColor: "yellow",
    marginLeft: wp(-5),
    fontFamily: "Gotham-SSm-Medium",
  },
});
