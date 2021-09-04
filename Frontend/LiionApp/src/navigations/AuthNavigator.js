import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import WelcomeScreen from "../screens/WelcomeScreen";
import AccountAccess from "../screens/login/AccountAccess";
import RegisterStepOne from "../screens/login/RegisterStepOne";
import RegisterStepTwo from "../screens/login/RegisterStepTwo";
import RecoverAccount from "../screens/login/RecoverAccount";

import { COLORS, hp, wp } from "../constants/styleThemes";

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="AccountAccess"
        component={AccountAccess}
        options={({ navigation }) => ({
          title: "Acceso",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomeScreen")}
            >
              <AntDesign
                name="left"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("2.5%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AuthStack.Screen
        name="RecoverAccount"
        component={RecoverAccount}
        options={({ navigation }) => ({
          title: "Restablecimiento",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountAccess")}
            >
              <AntDesign
                name="left"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("2.5%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AuthStack.Screen
        name="RegisterStepOne"
        component={RegisterStepOne}
        options={({ navigation }) => ({
          title: "Registro",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomeScreen")}
            >
              <AntDesign
                name="left"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("2.5%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AuthStack.Screen
        name="RegisterStepTwo"
        component={RegisterStepTwo}
        options={({ navigation }) => ({
          title: "Registro",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterStepOne")}
            >
              <AntDesign
                name="left"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("2.5%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </AuthStack.Navigator>
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
});

export default AuthNavigator;
