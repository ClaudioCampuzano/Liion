import React, {useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import CrearViajesStack from "../navigations/CrearViajesStack";

const Drawer = createDrawerNavigator();

export default function DrawerStack(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen}/>
            <Drawer.Screen name='CrearViaje' component={CrearViajesStack}/>
        </Drawer.Navigator>
    );
}
