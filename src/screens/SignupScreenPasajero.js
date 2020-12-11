import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from "../components/FormButton";



import FormInput from '../components/FormInput';
import { AuthContext } from '../navigations/AuthProvider';

export default function SignupScreenPasajero ({ navigation }){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [telefono, setTelefono] = useState('')
const [rut, setRut] = useState('')
  const  { register, register2 } = useContext(AuthContext);


    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hola nuevo  Liioner </Text>
            <Text style={styles.text}>Cree su cuenta</Text>

            <FormInput
                value={nombre}
                placeholderText='Nombre'
                onChangeText={Nombre => setNombre(Nombre)}
                autoCapitalize='words'
                autoCorrect={false}
            />

        <FormInput
                value={apellidos}
                placeholderText='Apellidos'
                onChangeText={Apellidos => setApellidos(Apellidos)}
                autoCapitalize='words'
                autoCorrect={false}
            />

                <FormInput
                value={telefono}
                placeholderText='Telefono Celular'
                onChangeText={telefono => setTelefono(telefono)}
                autoCapitalize='none'
                keyboardType='phone-pad'
                autoCorrect={false}
            />

            <FormInput
                value={rut}
                placeholderText='Rut o Pasaporte'
                onChangeText={rut => setRut(rut)}
                autoCapitalize='none'
                keyboardType='numeric'
                autoCorrect={false}
            />


            <FormInput
                value={email}
                placeholderText='Email'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />
            <FormInput
                value={password}
                placeholderText='Contrasena'
                onChangeText={userPassword => {
                setPassword(userPassword) }
                }
                secureTextEntry={true}
            />
            <FormButton buttonTitle='Registrarse' onPress={() => {
                var user = {
                    nombre: nombre,
                    apellidos: apellidos,
                    telefono: telefono,
                    rut: rut,
                    espasajero: true,
                    esconductor: false
                };
                register2(user,email, password)
            }
                } />
            <FormButton buttonTitle='Volver' onPress={() => navigation.navigate('Signup')} />
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