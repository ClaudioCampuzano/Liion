import React, {useEffect, useState, useContext} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import firebase from "../../constants/firebase";
import { AuthContext } from '../../navigations/AuthProvider';

const DetallesViajeScreen = (props) => {

    const { actualizarDb, eliminarDb, recuperarDb } = useContext(AuthContext);


    const initialState = {
        id: '',
        email: '',
        tipo: ''
    }

    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);

    const getUserById = async (id) => {
       const dbRef =  firebase.firestore().collection('users').doc(id);
       const doc = await dbRef.get();
       const user = doc.data();
       console.log(user);
       setUser({
           ...user,
           id: doc.id,
       });
       setLoading(false)
    }
    
    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

    const deleteUSer = async () => {
        eliminarDb('users',props.route.params.userId);
        props.navigation.navigate('ViajeListScreen');
    }

    const updateUser = async () => {
        let data ={
            email: user.email,
            tipo: user.tipo
        }
        actualizarDb('users', data,  props.route.params.userId)
        setUser(initialState)
        props.navigation.navigate('ViajeListScreen');
    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar Usuario', '¿Estas seguro?', [
            {text: 'Sí', onPress: () => deleteUSer()},
            {text: 'No', onPress: () => console.log(false)}
        ])
    }

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Correo de usuario"
                    value={user.email}
                    onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Teléfono de usuario"
                    value={user.tipo}
                    onChangeText={(value) => handleChangeText('tipo', value)}
                />
            </View>
            <View>
                <Button
                    color="#19AC52"
                    title="Actualizar Usuario"
                    onPress={() => updateUser()}/>
            </View>
            <View>
                <Button
                    color="#E37399"
                    title="Eliminar Usuario"
                    onPress={() => openConfirmationAlert()}/>
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

export default DetallesViajeScreen