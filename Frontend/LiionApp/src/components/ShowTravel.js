import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, hp, wp } from "../constants/styleThemes";
import { FontAwesome } from "@expo/vector-icons";

const ShowTravel = (props) => {
  const {
    style,
    labelO,
    labelD,
    timeStart,
    timeEnd,
    onBlur,
    onFocus,
    dirTextSize,
    ...restOfProps
  } = props;

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const BigIconSize = 7;
  const TinyIconSize = 5;

  return (
    <View style={style}>
      <View style={styles.firstView}>
        <View style={styles.timeView}>
          <Text style={styles.timeTextStyle}>{timeStart}</Text>
          <Text style={styles.timeTextStyle}>{timeEnd}</Text>
        </View>
        <View style={styles.figureView}>
          <FontAwesome
            name="circle-o"
            size={BigIconSize}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.5") }}
          />
          <FontAwesome
            name="circle-o"
            size={TinyIconSize}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={TinyIconSize}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={TinyIconSize}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={TinyIconSize}
            color={COLORS.LEAD}
            style={{ paddingBottom: hp("0.3") }}
          />
          <FontAwesome
            name="circle-o"
            size={BigIconSize}
            color={COLORS.TURKEY}
            style={{ paddingTop: hp("0.5") }}
          />
        </View>
        <View style={styles.addressView}>
          <Text style={styles.text1Style}> Origen </Text>
          <Text style={{ ...styles.text2Style, fontSize: dirTextSize }}>
            {labelO}
          </Text>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.text1Style}> Destino </Text>
            <Text style={{ ...styles.text2Style, fontSize: dirTextSize }}>

              {labelD}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShowTravel;

const styles = StyleSheet.create({
  firstView: {
    flexDirection: "row",
    height: hp("11%"),
  },
  figureView: {
    borderRadius: 17,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  timeView: {
    borderRadius: 17,
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  timeTextStyle: {
    fontFamily: "Gotham-SSm-Bold",
  },
  addressView: {
    borderRadius: 17,
    flex: 10,
    flexDirection: "column",
  },
  barSeparator: {
    flex: 1,
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 25,
  },
  text1Style: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.5%"),
    paddingLeft: wp("1%"),
    paddingTop: hp("0.0%"),
  },
  text2Style: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 10,
    paddingLeft: wp("1%"),
    paddingTop: hp("0.1%"),
  },
});
