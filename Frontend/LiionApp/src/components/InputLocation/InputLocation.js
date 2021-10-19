import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  Easing,
} from "react-native";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import { FontAwesome } from "@expo/vector-icons";
import CustomInput from "./CustomInput";

const InputLocation = (props) => {
  const {
    style,
    valueO,
    valueD,
    labelO,
    labelD,
    onBlur,
    onFocus,
    ...restOfProps
  } = props;

  const [origin , setOrigin] = useState('');
  const [destination , setDestination] = useState('');

  return (
    <View style={style}>
      <View style={styles.firstView}>
        <View style={styles.figureView}>
          <FontAwesome
            name="circle-o"
            size={20}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("1") }}
          />
          <FontAwesome
            name="circle-o"
            size={5}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={5}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={5}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={5}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={20}
            color={COLORS.TURKEY}
            style={{ paddingTop: hp("1") }}
          />
        </View>
        <View style={styles.addressView}>
          <View style={[styles.barSeparator, { justifyContent: "center" }]}>
            <CustomInput
              label={labelO}
              value={origin}
              onChangeText={(text) => setOrigin(text)}
              secureTextEntry={false}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomInput
              label={labelD}
              value={destination}
              onChangeText={(text) => setDestination(text)}
              secureTextEntry={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputLocation;

const styles = StyleSheet.create({
  firstView: {
    borderWidth: 1,
    borderRadius: 17,
    height: hp("15%"),
    borderColor: COLORS.BORDER_COLOR,
    flexDirection: "row",
  },
  figureView: {
    borderRadius: 17,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  addressView: {
    borderRadius: 17,
    flex: 8,
    flexDirection: "column",
  },
  barSeparator: {
    flex: 1,
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 20,
  },
});
