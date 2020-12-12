import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from "../components/FormButton";



import FormInput from '../components/FormInput';
import { AuthContext } from '../navigations/AuthProvider';

export default function SignupScreenPasajero ({ navigation }){
const [modelovehiculo, setModelovehiculo] = useState('')
const [patentevehiculo, setPatentevehiculo] = useState('')
const [certAntecedentes, setCertAntecedentes] = useState('')
const [hojaVidaConductor, setHojaVidaConductor] = useState('')
const [licConducir, setLicConducir] = useState('')
  const  { register, register2, updateconductor, userobj, actualizarDb} = useContext(AuthContext);


  if(!userobj || !userobj.nombre || !userobj.apellidos){
    console.log(JSON.stringify(userobj))
    return <Loading />;
  }

  else{


    if(!userobj.esconductor) { //no es conductor


    return(
        

        

        <View style={styles.container}>
            <Text style={styles.text}>Hola nuevo  Liioner </Text>
            <Text style={styles.text}>Cree su cuenta</Text>

            <FormInput
                value={certAntecedentes}
                placeholderText='certAntecedentes'
                onChangeText={certAntecedentes => setCertAntecedentes(certAntecedentes)}
                autoCapitalize='none'
                autoCorrect={false}
            />

        <FormInput
                value={modelovehiculo}
                placeholderText='modelovehiculo'
                onChangeText={modelovehiculo => setModelovehiculo(modelovehiculo)}
                autoCapitalize='none'
                autoCorrect={false}
            />

                <FormInput
                value={patentevehiculo}
                placeholderText='patentevehiculo '
                onChangeText={patentevehiculo => setPatentevehiculo(patentevehiculo)}
                autoCapitalize='none'
                autoCorrect={false}
            />

            <FormInput
                value={hojaVidaConductor}
                placeholderText='hojaVidaConductor '
                onChangeText={hojaVidaConductor => setHojaVidaConductor(hojaVidaConductor)}
                autoCapitalize='none'
                autoCorrect={false}
            />


            <FormInput
                value={licConducir}
                placeholderText='licConducir'
                onChangeText={licConducir => setLicConducir(licConducir)}
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <FormButton buttonTitle='Update' onPress={() => {
                var aux_obj = userobj
                aux_obj.modelovehiculo=modelovehiculo
                aux_obj.patentevehiculo=patentevehiculo
                aux_obj.certAntecedentes=certAntecedentes
                aux_obj.hojaVidaConductor=hojaVidaConductor
                aux_obj.licConducir=licConducir
                aux_obj.calificacion=0
                aux_obj.esconductor=true
                actualizarDb("users", aux_obj, userobj.id)
                //updateconductor(modelovehiculo, patentevehiculo, certAntecedentes, hojaVidaConductor, licConducir, calificacion)
            }
                } />
            
        </View>
    );
            }
    else{
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles2.text}>Buena Ya eres conductor </Text>
        </View>
        )
    }







            }
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