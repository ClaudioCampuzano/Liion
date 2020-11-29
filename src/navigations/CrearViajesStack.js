import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import ViajeListScreen from "../screens/CrearViaje/ViajeListScreen";
import CrearViajeScreen from "../screens/CrearViaje/CrearViajeScreen";
import DetallesViajeScreen from "../screens/CrearViaje/DetallesViajeScreen";

export default function CrearViajesStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="ViajeListScreen" component={ ViajeListScreen } options={{title: 'Lista de Viajes'}}/>
        <Stack.Screen name="CrearViajeScreen" component={ CrearViajeScreen } options={{title: 'Crear Viajes'}} />
        <Stack.Screen name="DetallesViajeScreen" component={ DetallesViajeScreen } options={{title: 'Detalle del Viaje'}} />
    </Stack.Navigator>
    );
}