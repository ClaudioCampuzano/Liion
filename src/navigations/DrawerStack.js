import React, {useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import ListViajesStack from "./ListViajesStack";
import CrearViajeStack from './CrearViajeStack';
import RegistroConductor from "./RegistroConductor";
const Drawer = createDrawerNavigator();

export default function DrawerStack(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen}/>
            <Drawer.Screen name='CrearViaje' component={CrearViajeStack}/>
            <Drawer.Screen name='ListViaje' component={ListViajesStack}/>
            <Drawer.Screen name='Registro Conductor' component={RegistroConductor} />
        </Drawer.Navigator>
    );
}