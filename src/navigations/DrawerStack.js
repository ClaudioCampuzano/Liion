import React, {useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";


const Drawer = createDrawerNavigator();

export default function DrawerStack(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen}/>
        </Drawer.Navigator>
    );
}
