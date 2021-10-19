import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
//Constants.manifest.extra.firebase.apiKey

import { COLORS, hp, wp } from "../../constants/styleThemes";

const CustomInput = (props) => {
  const { label, value, secureTextEntry, onBlur, onFocus, ...restOfProps } =
    props;

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

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        secureTextEntry={secureTextEntry}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      /> 
{/*       <GooglePlacesAutocomplete
        style={{position: 'absolute' }}
        query={{
          key: Constants.manifest.extra.firebase.apiKey,
          language: "es",
          components: "country:cl",
        }}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        textInputProps={{
          onFocus: (event) => {
            setIsFocused(true);
            onFocus?.(event);
          },
          onBlur: (event) => {
            setIsFocused(false);
            onBlur?.(event);
          },
          ref: { inputRef },
        }}
      />
 */}

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
                    outputRange: [hp("0.8"), -hp("2")],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [wp("1"), 0],
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
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    paddingLeft: wp("4"),
    paddingTop: hp("1"),
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
});
