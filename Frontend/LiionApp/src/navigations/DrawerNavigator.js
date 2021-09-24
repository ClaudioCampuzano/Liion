import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";

import SearchNavigator from "./SearchNavigator";

import SearchStepOne from "../screens/searchTrip/SearchStepOne";

import { DrawerContent } from "./drawer/DrawerContent";
import { COLORS, hp, wp } from "../constants/styleThemes";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{ drawerStyle: styles.drawerStyle }}
      >
        <Drawer.Screen
          name="SearchStack"
          component={SearchNavigator}
          options={{ headerShown: false }}t 
        />
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.TURKEY,
    height: hp("7%"),
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp("3.5%"),
  },
  drawerStyle: {
    backgroundColor: COLORS.WHITE,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    width: wp("65"),
  },
});

export default DrawerNavigator;

