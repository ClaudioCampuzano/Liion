import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from "../components/FormButton";

export default function WelcomeScreen ({ navigation }){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a Liion</Text>
            <FormButton buttonTitle='Comenzemos' onPress={() => navigation.navigate('Login')} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    navButton: {
        marginTop: 15
    },
    navButtonText: {
        fontSize: 20,
        color: '#6646ee'
    }
});
