import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BienvenidaScreen from "./screens/BienvenidaScreen";
import BuscarScreen from "./screens/BuscarScreen";

const Stack = createStackNavigator();

const App = () => {
    const fake_tkn = useState(true);

    return (
        <NavigationContainer>
          <Stack.Navigator>
            {fake_tkn ? (
              <Stack.Screen
                name="BienvenidaScreen"
                component={BienvenidaScreen}
                options={{headerShown: false}}
              />
            ) : (
              <Stack.Screen name="BuscarScreen" component={BuscarScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default App
