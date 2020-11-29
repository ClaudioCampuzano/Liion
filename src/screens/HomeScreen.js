import React, {useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigations/AuthProvider';

export default function HomeScreen() {
  const { user, logout, tipo } = useContext(AuthContext);
  console.log(tipo);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Buena KinG jiro!~{"\n"+tipo}
       {tipo} </Text>

      <FormButton buttonTitle='Logout' onPress={() => logout()} />
    </View>
  );
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
