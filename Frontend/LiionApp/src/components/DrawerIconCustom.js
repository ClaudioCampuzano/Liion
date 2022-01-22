import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, hp, wp } from "../constants/styleThemes";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DrawerIconCustom = (props) => {
  const navigation = useNavigation();
  const { alert } = props;

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <View style={{}}>
        <Entypo
          name="menu"
          size={hp("5%")}
          color={COLORS.WHITE}
          style={{ marginLeft: wp("3%") }}
        />

        {alert === "soon" && (
          <View
            style={{
              position: "absolute",
              backgroundColor: COLORS.UPTRAVEL_WARN,
              borderRadius: hp(5),
              elevation: 5,
              height: hp(2.5),
              width: hp(2.5),
              alignItems: "center",
              right: hp(-1),
            }}
          >
            <Text style={{ color: COLORS.WHITE }}>{"!"}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DrawerIconCustom;

const styles = StyleSheet.create({});
