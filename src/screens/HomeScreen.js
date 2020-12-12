import React, {useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigations/AuthProvider';
import { useFonts } from 'expo-font';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const { user, logout, userobj } = useContext(AuthContext);
  useEffect(() => console.log(JSON.stringify(userobj)));
  //currentuser=userobj.userr
  //console.log(currentuser)
  let [fonstLoaded] = useFonts({
    'GothamSSM-Bold':require('../../assets/fonts/GothamSSM-Bold.otf'),
    'GothamSSM-Medium': require('../../assets/fonts/GothamSSM-Medium.otf')
  });

  if(!fonstLoaded || !userobj || !userobj.nombre || !userobj.apellidos){
    console.log(JSON.stringify(userobj))
    return <Loading />;
  }
  
  else{
    //console.log('jiro')
    //console.log(JSON.stringify(userobj))
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'GothamSSM-Bold', fontSize: 40 }}>GothamSSM-Bold</Text>
        <Text style={{ fontFamily: 'GothamSSM-Medium', fontSize: 40 }}>Platform Default</Text>
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
        <Text style={styles.text}>Buena  {userobj.nombre}  {userobj.apellidos} {"\n"}   Pasajero {JSON.stringify(userobj.espasajero)} Conductor {JSON.stringify(userobj.esconductor)} </Text>
       
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});


//<Text style={styles.text}>Buena  {JSON.stringify(userobj.nombre)}  {JSON.stringify(userobj.apellido)} {"\n"}   Pasajero {JSON.stringify(userobj.espasajero)} Conductor {JSON.stringify(userobj.esconductor)} </Text>