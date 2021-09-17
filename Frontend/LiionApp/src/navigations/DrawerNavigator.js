import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import TestHomeScreen from '../screens/TestHomeScreen';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen
            name="TestHomeScreen"
            component={TestHomeScreen}
            options={{ headerShown: false }}
            >
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator


