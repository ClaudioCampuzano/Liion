import React, {useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigations/AuthProvider';
import { useFonts } from 'expo-font';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const { user, logout, tipo } = useContext(AuthContext);
  
  let [fonstLoaded] = useFonts({
    'GothamSSM-Bold':require('../../assets/fonts/GothamSSM-Bold.otf'),
    'GothamSSM-Medium': require('../../assets/fonts/GothamSSM-Medium.otf')
  });

  if(!fonstLoaded){
    return <Loading />;
  }
  else{
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'GothamSSM-Bold', fontSize: 40 }}>GothamSSM-Bold</Text>
        <Text style={{ fontFamily: 'GothamSSM-Medium', fontSize: 40 }}>Platform Default</Text>
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
        <Text style={styles.text}>Buena KinG jiro!~{"\n"} {tipo} </Text>
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
