import React, { useContext, useState } from 'react'
import { View, Button, TextInput, Text, ScrollView, StyleSheet } from 'react-native';
import firebase from '../constants/firebase';
import { AuthContext } from '../navigations/AuthProvider';

const CrearViajeScreen = (props) => {
    const { insertarDb, userobj } = useContext(AuthContext);

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
            insertarDb('viajes', state);
            props.navigation.navigate('ListViaje')
        }
    }


    if(!userobj || !userobj.nombre || !userobj.apellidos){
        //console.log(JSON.stringify(userobj))
        return <Loading />;
      }
      else{
        if(userobj.esconductor) { //es conductor

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
    else {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles2.text}>No eres conductor </Text>
        </View>
        )
    }



}



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



const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f1'
    },
    text: {
      fontSize: 20,
      color: '#333333',
      marginBottom: 50
    }
  });

export default CrearViajeScreen