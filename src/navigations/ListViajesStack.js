import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import ViajeListScreen from "../screens/ListViaje/ViajeListScreen";
import DetallesViajeScreen from "../screens/ListViaje/DetallesViajeScreen";

export default function ListViajesStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="ViajeListScreen" component={ ViajeListScreen } options={{title: 'Lista de Viajes', headerStyle: {backgroundColor: '#009999'}}}/>
        <Stack.Screen name="DetallesViajeScreen" component={ DetallesViajeScreen } options={{title: 'Detalle del Viaje', headerStyle: {backgroundColor: '#009999'}}} />
    </Stack.Navigator>
    );
}