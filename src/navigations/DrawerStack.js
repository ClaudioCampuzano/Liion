import React, {useContext, useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import ListViajesStack from "./ListViajesStack";
import CrearViajeStack from './CrearViajeStack';
import RegistroConductor from "../screens/RegistroConductor";
import { AuthContext } from './AuthProvider';
const Drawer = createDrawerNavigator();

export default function DrawerStack(){
    const { insertarDb, userobj } = useContext(AuthContext);


    if(!userobj){
        return (
            <Drawer.Navigator>
                 <Drawer.Screen name='Home' component={HomeScreen}/>
        </Drawer.Navigator>
    );
            
    }
else{
    if(!userobj.esconductor){  //no es conductor

        return(
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={HomeScreen}/>
                <Drawer.Screen name='ListViaje' component={ListViajesStack}/>
                <Drawer.Screen name='Registro Conductor' component={RegistroConductor} />
            </Drawer.Navigator>
        );
    }
    else { //es conductor
        return(
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={HomeScreen}/>
                <Drawer.Screen name='CrearViaje' component={CrearViajeStack}/>
                <Drawer.Screen name='ListViaje' component={ListViajesStack}/>
            </Drawer.Navigator>
        );
    }







    }




}



    
