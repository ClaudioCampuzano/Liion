import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';



export default function SignupScreen({ navigation }) {


 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seleccione tipo de cuenta</Text>      
      <FormButton buttonTitle='Pasajero' onPress={() => navigation.navigate('SignupPasajero')} />
      <FormButton buttonTitle='Conductor' onPress={() => navigation.navigate('SignupConductor')} />
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
  }
});



/*

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigations/AuthProvider';
import { Picker } from '@react-native-picker/picker';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('pasajero');

  const  { register } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cree su cuenta</Text>
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
        placeholderText='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />

      <Picker
        selectedValue={tipo}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue, itemIndex) => {
            setTipo(itemValue);
            console.log(itemValue);
            }
        }>
        <Picker.Item label="Pasajero" value="pasajero" />
        <Picker.Item label="Conductor" value="conductor" />
      </Picker>

      <FormButton buttonTitle='Signup' onPress={() => register(email, password, tipo)} />
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
  }
});


*/