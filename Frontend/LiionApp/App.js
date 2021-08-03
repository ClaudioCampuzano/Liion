import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BienvenidaScreen from "./src/screens/BienvenidaScreen";
import BuscarScreen from "./src/screens/BuscarScreen";

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
};

export default App;

/*
<Stack.Navigator headerMode="none">
        {user ? (
            <Stack.Screen name="DrawerScreen" >
                {(props) => < DrawerScreen  {...props} user={user} />}
            </Stack.Screen>
        ) : (
            <Stack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                    animationEnabled: true
                }}
            />
        )}
    </Stack.Navigator>*/
