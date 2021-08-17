import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import BienvenidaScreen from "../screens/accesoRegistro/BienvenidaScreen";
import AccesoCuenta from "../screens/accesoRegistro/AccesoCuenta";
import RegistroCuenta from "../screens/accesoRegistro/RegistroCuenta";
import RegistroCuentaCorreo from "../screens/accesoRegistro/RegistroCuentaCorreo";


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
          headerStyle: { backgroundColor: "#009999", height: 60 },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "Gotham-SSm-Book",
            fontSize: 28,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("BienvenidaScreen")}
            >
              <AntDesign
                name="left"
                size={40}
                color="#ffffff"
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
          headerStyle: { backgroundColor: "#009999", height: 60 },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "Gotham-SSm-Book",
            fontSize: 28,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("BienvenidaScreen")}
            >
              <AntDesign
                name="left"
                size={40}
                color="#ffffff"
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
          headerStyle: { backgroundColor: "#009999", height: 60 },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "Gotham-SSm-Book",
            fontSize: 28,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("RegistroCuenta")}
            >
              <AntDesign
                name="left"
                size={40}
                color="#ffffff"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
