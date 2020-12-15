import React, { useContext, useState, useEffect } from 'react'
import { View, Button, TextInput, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../constants/firebase';
import { AuthContext } from '../navigations/AuthProvider';

import moment from "moment";



const CrearViajeScreen = (props) => {
    const { insertarDb, userobj } = useContext(AuthContext);

    const [state, setState] = useState({
        origen: [],
        destino: [],
        preciototal: 0,
        cupos: 0,
        fecha: '',
        conductorId:'',
        conductorN:'',
        conductorA:'',
        precioindividual:0,
        desc:''
    })

    const [flag, setFlag] = useState(false)

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    
   
   

   


    const crearNuevoViaje = async () => {
        if(state.origen === undefined || state.destino === undefined || state.fecha === '' || state.origen.length < 2 || state.destino.length < 2 
        || parseInt(state.preciototal) == 0 || parseInt(state.cupos) == 0 ){
            alert('Completa la informacion')
            //console.log(state.origen === undefined, state.destino === undefined,state.fecha === '', state.origen.length < 2, state.destino.length < 2,
             //parseInt(state.preciototal) == 0, parseInt(state.cupos) == 0 )
            console.log(state)
        }else {
            insertarDb('viajes', state, 'crearviaje');
            props.navigation.navigate('ListViaje')
            console.log(state)
        }
    }


    const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    handleChangeText('fecha', moment(date).format('YYYY-MM-DD HH:mm:ss'))
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
   
        var auxob = state;
        auxob.conductorId = userobj.id;
        auxob.conductorA = userobj.apellidos;
        auxob.conductorN = userobj.nombre;
        setState(auxob)
        //console.log(auxob);
  
    
    
    
    var cupo = parseInt(state.cupos)
    var ptotal = parseInt(state.preciototal)
    if(cupo > 0 && ptotal> 0) handleChangeText('precioindividual', ptotal/cupo ) 
  }, [flag, state.cupos, state.preciototal]);




 

    if(!userobj || !userobj.nombre || !userobj.apellidos || !userobj.id){
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
                    onChangeText={(value) => handleChangeText('origen', [-33.035552, -71.591687])}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Destino del viaje"
                    onChangeText={(value) => handleChangeText('destino', [-33.442307, -70.654574])}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Descripcion corta"
                    onChangeText={(value) => handleChangeText('desc', value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Costo Total"
                    onChangeText={(value) => handleChangeText('preciototal', value)}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Cupos"
                    onChangeText={(value) => handleChangeText('cupos', value)}
                    keyboardType='numeric'
                />
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles2.text}> Fecha {state.fecha}  </Text>
            </View>

        <View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
        <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            
            />
        )}
        </View>





        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles2.text}> Precio por Asiento {state.precioindividual}  </Text>
            </View>




            <View>
                <Button title="Crear viaje" onPress={ (cb) => {
                setFlag(true)
                
               
               
                 var cb;
                 (cb = function(){
                    //console.log(state)
                    crearNuevoViaje()
                })();
            
            }}
                
                />
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