import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import CrearViajeScreen from "../screens/CrearViajeScreen";

export default function CrearViajeStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="CrearViajeScreen" component={ CrearViajeScreen } options={{title: 'Crear Viaje'}}/>
    </Stack.Navigator>
    );
}