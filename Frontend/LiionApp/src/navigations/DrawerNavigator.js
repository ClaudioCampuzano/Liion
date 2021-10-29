import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SearchNavigator from "./SearchNavigator";
import CreateNavigator from "./CreateNavigator";
import MyTravelNavigator from "./TravelNavigator";
import DriverSigninNavigator from "./DriverSigninNavigator";

import DrawerContent from "./drawer/DrawerContent";
import { COLORS, hp, wp } from "../constants/styleThemes";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ drawerStyle: styles.drawerStyle, unmountOnBlur: true }}
      initialRouteName="CreateNavigator"
      
    >
      <Drawer.Screen
        name="SearchStack"
        component={SearchNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="DriverSigninStack"
        component={DriverSigninNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="CreateNavigator"
        component={CreateNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="MyTravelNavigator"
        component={MyTravelNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

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
    width: wp("76"),
  },
});
