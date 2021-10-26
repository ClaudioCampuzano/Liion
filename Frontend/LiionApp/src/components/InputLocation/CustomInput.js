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
  const {
    label,
    value,
    secureTextEntry,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props;

  const [location, setLocation] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || location ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, location]);

  let color = isFocused ? COLORS.TURKEY : COLORS.LEAD;
  let colorText = isFocused ? COLORS.TURKEY : COLORS.BORDER_COLOR;

  return (
    <View style={style}>
      <GooglePlacesAutocomplete
        listViewDisplayed="auto"
        query={{
          key: Constants.manifest.extra.firebase.apiKey,
          language: "es",
          components: "country:cl",
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        placeholder={label}
        minLength={4}
        enablePoweredByContainer={false}
        disableScroll={true}
        nearbyPlacesAPI="none"
        debounce={400}
      />
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
    paddingTop: hp("3"),
    backgroundColor: COLORS.WHITE,
  },
  label: {
    backgroundColor: "yellow",
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("1.8%"),
  },
});
