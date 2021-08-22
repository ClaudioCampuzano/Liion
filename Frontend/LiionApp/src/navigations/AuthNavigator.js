import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import BienvenidaScreen from "../screens/accesoRegistro/BienvenidaScreen";
import AccesoCuenta from "../screens/accesoRegistro/AccesoCuenta";
import RegistroCuenta from "../screens/accesoRegistro/RegistroCuenta";
import RegistroCuentaCorreo from "../screens/accesoRegistro/RegistroCuentaCorreo";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../constants/styleThemes";

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="BienvenidaScreen"
        component={BienvenidaScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="AccesoCuenta"
        component={AccesoCuenta}
        options={({ navigation }) => ({
          title: "Acceso",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("BienvenidaScreen")}
            >
              <AntDesign
                name="left"
                size={40}
                color={COLORS.WHITE}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AuthStack.Screen
        name="RegistroCuenta"
        component={RegistroCuenta}
        options={({ navigation }) => ({
          title: "Registro",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("BienvenidaScreen")}
            >
              <AntDesign
                name="left"
                size={40}
                color={COLORS.WHITE}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AuthStack.Screen
        name="RegistroCuentaCorreo"
        component={RegistroCuentaCorreo}
        options={({ navigation }) => ({
          title: "Registro",
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("RegistroCuenta")}
            >
              <AntDesign
                name="left"
                size={40}
                color={COLORS.WHITE}
                style={{ marginLeft: 10 }}
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
    height: heightPercentageToDP("7"),
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Book",
    fontSize: 28,
  },
});

export default AuthNavigator;
