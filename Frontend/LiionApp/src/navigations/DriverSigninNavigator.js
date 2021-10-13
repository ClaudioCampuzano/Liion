import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import DriverSignupOne from "../screens/driverSignin/DriverSigninOne";
import { COLORS, hp, wp } from "../constants/styleThemes";

// La idea aca es que, en el tab va a poder elegir entre conductor o pasajero para
// y de ahi va a poder ir a los demas elemos de este stack, que reaccionan
// en base a los viajes q hayan
const DriverSigninNavigator = () => {
  const DriversigninStack = createStackNavigator();

  return (
    <DriversigninStack.Navigator>
      <DriversigninStack.Screen
        name="DriverSignupOne"
        component={DriverSignupOne}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerTitle: '',
          headerRight: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Entypo
                name="menu"
                size={hp("5%")}
                color={COLORS.TURKEY}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </DriversigninStack.Navigator>
  );
};

export default DriverSigninNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.WHITE,
    height: hp("7%"),
    borderBottomWidth: 0,
  },
  headerText: {
    color: COLORS.TURKEY,
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp("3.5%"),
  },
});
