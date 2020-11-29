import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../../constants/firebase';

const CrearViajeScreen = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const createNewUser = async () => {
        if(state.name === ''){
            alert('Complete el nombre')
        }else {
            try {
                await firebase.firestore().collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
                props.navigation.navigate('ViajeListScreen')
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre del viaje"
                    onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Cantidad de cupos"
                    onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Valor del viaje"
                    onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>
            <View>
                <Button title="Guardar Usuario" onPress={() => createNewUser()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CrearViajeScreen