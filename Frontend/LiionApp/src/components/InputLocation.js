import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS, hp, wp } from "../constants/styleThemes";
import { FontAwesome } from "@expo/vector-icons";
import PlaceRow from "./PlaceRow";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import { apiKey } from "@env";

const InputLocation = (props) => {
  const { style, labelO, labelD, errorText, onFocus, ...restOfProps } = props;

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const errorMsg = useRef(null);

  Location.installWebGeolocationPolyfill();

  useEffect(() => {
    if (origin && destination) {
      props.onDataChange({ origin, destination });
    }
  }, [origin, destination]);

  useEffect(() => {
    (async () => {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        errorMsg.current = "Permission to access location was denied";
        return;
      }
    })();
  }, []);

  const result = (address_components) => {
    var entries = [];
    for (var i = 0; i < address_components.length; i++) {
      entries.push({
        index: i,
        long_name: address_components[i].long_name,
        type: address_components[i].types[0],
      });
    }
    return entries;
  };

  let color = COLORS.LEAD;
  let labelOrigin = labelO;
  let labelDestination = labelD;

  if (errorText) {
    color = COLORS.WARN_RED;
    labelOrigin += "*";
    labelDestination += "*";
  }

  return (
    <SafeAreaView>
      <View style={[style, styles.container]}>
        <View style={[styles.firstView, errorText && { borderColor: color }]}>
          <Text></Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder={labelOrigin}
          onPress={(data, details = null) => {
            setOrigin({
              formatted_address: details.formatted_address,
              location: details.geometry.location,
              address_components: result(details.address_components),
            });
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Locacion actual"
          styles={{
            textInput: [
              { ...styles.textInput, ...styles.barSeparator },
              errorText && { borderBottomColor: color },
            ],
            container: { ...styles.autocompleteContainer, top: 0 },
            listView: styles.listView,
            separator: styles.separator,
          }}
          textInputProps={{
            placeholderTextColor: color,
            onFocus: (event) => onFocus?.(event),
          }}
          fetchDetails
          minLength={4}
          query={{
            key: apiKey,
            language: "es",
            components: "country:cl",
            radius: "5",
          }}
          renderRow={(data, index) => <PlaceRow data={data} index={index} />}
          renderDescription={(data) => data.description || data.vicinity}
        />
        <GooglePlacesAutocomplete
          placeholder={labelDestination}
          onPress={(data, details = null) => {
            setDestination({
              formatted_address: details.formatted_address,
              location: details.geometry.location,
              address_components: result(details.address_components),
            });
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          minLength={4}
          textInputProps={{
            placeholderTextColor: color,
            onFocus: (event) => onFocus?.(event),
          }}
          styles={{
            textInput: styles.textInput,
            listView: styles.listViewSub,
            container: {
              ...styles.autocompleteContainer,
              top: hp(6.6),
            },
            separator: styles.separator,
          }}
          minLength={4}
          fetchDetails
          query={{
            key: apiKey,
            language: "es",
            components: "country:cl",
          }}
          renderRow={(data, index) => <PlaceRow data={data} index={index} />}
        />
        <FontAwesome
          name="circle-o"
          size={20}
          color={COLORS.LEAD}
          style={styles.figure1}
        />
        <FontAwesome
          name="circle-o"
          size={5}
          color={COLORS.LEAD}
          style={styles.figure2}
        />
        <FontAwesome
          name="circle-o"
          size={5}
          color={COLORS.LEAD}
          style={styles.figure3}
        />
        <FontAwesome
          name="circle-o"
          size={5}
          color={COLORS.LEAD}
          style={styles.figure4}
        />

        <FontAwesome
          name="circle-o"
          size={20}
          color={COLORS.TURKEY}
          style={styles.figure5}
        />
        {!!errorText && <Text style={styles.error}>{errorText}</Text>}
      </View>
    </SafeAreaView>
  );
};

InputLocation.defaultProps = {
  onDataChange: () => {},
};

export default InputLocation;
const styles = StyleSheet.create({
  figure1: { top: hp("2.4"), left: wp("3.5"), position: "absolute" },
  figure2: { top: hp("5.4"), left: wp("5"), position: "absolute" },
  figure3: { top: hp("6.6"), left: wp("5"), position: "absolute" },
  figure4: { top: hp("7.8"), left: wp("5"), position: "absolute" },
  figure5: { top: hp("9"), left: wp("3.5"), position: "absolute" },

  firstView: {
    borderWidth: 1,
    borderRadius: 17,
    height: hp("14%"),
    width: wp("78.6%"),
    borderColor: COLORS.BORDER_COLOR,
  },
  barSeparator: {
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 20,
    paddingBottom: hp("1.8"),
  },

  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: wp(2.4),
    right: wp(3.5),
  },
  separator: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 0,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 20,
    height: 1,
  },
  textInput: {
    paddingTop: hp(1.8),
    marginLeft: wp(7.1),
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.TURKEY,
    fontSize: hp("1.8%"),
  },
  listView: {
    position: "absolute",
    top: hp("14"),
  },
  listViewSub: {
    position: "absolute",
    top: hp(7.2),
  },
  container: {
    padding: 0,
    height: hp("40%"),
  },
  error: {
    marginTop: hp("0.5%"),
    marginLeft: wp("2.3%"),
    fontSize: hp("1.4%"),
    color: COLORS.WARN_RED,
    fontFamily: "Gotham-SSm-Medium",
  },
});
