import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BienvenidaScreen from "./screens/accesoRegistro/BienvenidaScreen";
import AccesoCuenta from "./screens/accesoRegistro/AccesoCuenta";

import BuscarScreen from "./screens/buscarViaje/BuscarScreen";

import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BienvenidaScreen"
          component={BienvenidaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccesoCuenta"
          component={AccesoCuenta}
          options={({ navigation }) => ({
            title: "Acceso",
            headerShown: true,
            headerStyle: { backgroundColor: "#009999", height: 60 },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: "#ffffff", fontFamily: "Gotham-Book", fontSize: 30 },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
