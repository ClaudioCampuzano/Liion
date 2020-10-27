import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

import Home from "../screens/Home/Home";
import Notificaciones from "../screens/Notificaciones";

const Tab = createBottomTabNavigator();

export default function TabPersonalizado({navigation}) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home';
                    } else if (route.name === 'Notificaciones') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}     />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Notificaciones" component={Notificaciones} />
        </Tab.Navigator>
    );
}
