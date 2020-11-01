import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Bienvenida({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Empezemos po jiropa</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PhoneAuthentication')} ><Text>Login Celular</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} ><Text>Login correo</Text></TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
