import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { GlobalContext } from "../../context/Provider"

const CreateStepOne = () => {
    const { userData, uid, isLoggedIn, userFirestoreData, getState2 } = useContext(GlobalContext);
    
    useEffect (() => {
        let flag = Object.keys(userFirestoreData).length !== 0 && Object.getPrototypeOf(userFirestoreData) === Object.prototype; 
        if(userFirestoreData && flag){
            console.log(getState2)
        }
            
       
            
        
    }, [getState2] )
    
    return (
        <View>
            <Text>Creando viaje</Text>
        </View>
    )
}

export default CreateStepOne

const styles = StyleSheet.create({})
