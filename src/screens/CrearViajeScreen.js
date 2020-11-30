import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../constants/firebase';

const CrearViajeScreen = (props) => {

    const [state, setState] = useState({
        origen: '',
        destino: '',
        precio: '',
        cupos: '',
        fecha: '',
        hora: ''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const crearNuevoViaje = async () => {
        if(state.origen === '' || state.destino === '' || state.fecha === ''){
            alert('Completa la informacion')
        }else {
            try {
                await firebase.firestore().collection('viajes').add({
                    origen: state.origen,
                    destino: state.destino,
                    precio: state.precio,
                    cupos: state.cupos,
                    fecha: state.fecha,
                    hora: state.hora,
                })
                props.navigation.navigate('ListViaje')
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Origen del viaje"
                    onChangeText={(value) => handleChangeText('origen', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Destino del viaje"
                    onChangeText={(value) => handleChangeText('destino', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Precio"
                    onChangeText={(value) => handleChangeText('precio', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Cupos"
                    onChangeText={(value) => handleChangeText('cupos', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Fecha"
                    onChangeText={(value) => handleChangeText('fecha', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Hora"
                    onChangeText={(value) => handleChangeText('hora', value)}
                />
            </View>
            <View>
                <Button title="Crear viaje" onPress={() => crearNuevoViaje()}/>
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