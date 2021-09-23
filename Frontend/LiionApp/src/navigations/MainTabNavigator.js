import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SearchStepOne from "../screens/searchTrip/SearchStepOne";
import TestHomeScreen from "../screens/TestHomeScreen";

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestHomeScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
