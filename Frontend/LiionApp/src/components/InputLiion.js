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

const InputLiion = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    secureTextEntry,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    keyboardType,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? COLORS.TURKEY : COLORS.LEAD;
  let colorText = isFocused ? COLORS.TURKEY : COLORS.BORDER_COLOR;

  if (errorText) {
    color = COLORS.WARN_RED;
    colorText = COLORS.WARN_RED;
  }
  let keyboardTypeVal = keyboardType ? keyboardType: 'default'
  let autoCorrectVal = autoCorrect ? autoCorrect: false
  let autoCompleteVal = autoComplete ? autoComplete : 'off'
  let autoCapitalizeVal = autoCapitalize ? autoCapitalize : 'none'

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colorText,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalizeVal}
        autoComplete={autoCompleteVal}
        autoCorrect={autoCorrectVal}
        keyboardType={keyboardTypeVal}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
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

export default InputLiion;

const styles = StyleSheet.create({
  input: {
    padding: hp("2.4%"),
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
