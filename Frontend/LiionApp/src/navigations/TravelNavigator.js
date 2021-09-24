import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import TravelTabNavigator from './TravelTabNavigator'
import { COLORS, hp, wp } from "../constants/styleThemes";

// La idea aca es que, en el tab va a poder elegir entre conductor o pasajero para
// y de ahi va a poder ir a los demas elemos de este stack, que reaccionan
// en base a los viajes q hayan
const TravelNavigator = () => {
  const TravelStack = createStackNavigator();

  return (
    <TravelStack.Navigator>
      <TravelStack.Screen
        name="TravelTabNavigator"
        component={TravelTabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerTitle: (props) => (
            <Image
              style={{
                width: wp("11.8"),
                height: hp("6.95"),
                tintColor: COLORS.WHITE,
              }}
              source={require("../../assets/images/miniLogo.png")}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("chat")}>
              <Entypo
                name="chat"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginRight: wp("3%") }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Entypo
                name="menu"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </TravelStack.Navigator>
  );
};

export default TravelNavigator;

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
});
