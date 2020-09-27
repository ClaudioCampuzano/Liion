import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { firebase } from './src/firebase/config'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";




export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)





 

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);




  if (loading) {	
    return (	
      <></>	
    )	
  }




  return (


    <NavigationContainer>
    <RootStackScreen user={user} />
    </NavigationContainer>



    /*
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          
            <Stack.Screen name="Homes" component={Homes} />
        
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    */
  );
}

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const RootStackScreen = ({ user }) => (
  <RootStack.Navigator headerMode="none">
    {user ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);


function Homes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home1" component={HomesTab} />
    </Stack.Navigator>
  );
}
Tab = createBottomTabNavigator();
function HomesTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home11" component={HomeScreen} />
      <Tab.Screen name="jiro2" component={ () => {
        return (
          <View>
              <Text>Jiro2</Text>
          </View>
        )
      }}></Tab.Screen>
      </Tab.Navigator> 
  );
}





const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={RegistrationScreen}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

import { Text, View } from 'react-native'
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Homes" component={Homes} />
    <Drawer.Screen name="jiro1" component={ () => {
      return(
      <View>
      <Text>Jiro1</Text>
  </View>)
    }} />
  </Drawer.Navigator>
);


/*drawe: (foto nombre)
    -conductor homeacreen mapa 
      -mapa
      -menu deslizable crear viaje inicio final
        -inicio final rellenar weas
        -acepta jiros ?
        -cant asientos 
        -etcetx
      -boton/tab viaje activo
          -boton emergencia
          -mapa
    -conductor mis viajes (prox viajes y pasados)
      -lista de viajes (filtrar por prox o realizados)
        -detalles de viaje
    -conductor perfil sin tab, con 
      -boton editar perfil
      -foto
      -nombre
      -calificacion
      -autos
      -documentos:
        -licencia
        -documento de vehiculos
    -conductor notificaciones
      -lista de notificaciones (pasajero aplica a viaje)
    -conductor configuracion de pagos
      -como desea recibir su dinero
    -conductor logout




    -pasajero homescren 
      conductor homeacreen mapa 
      -mapa
      -menu deslizable buscar viaje inicio final
        -inicio final rellenar weas
        -lista con filtros
      -boton/tab viaje activo
          -boton emergencia
          -mapa
    -pasajero mis viajes (prox viajes y pasados)
      -lista de viajes (filtrar por prox o realizados)
      -detalles de viaje
    -pasajero perfil sin tab, con 
      -boton editar perfil
      -foto
      -nombre
      -calificacion
    -pasajero notificaciones
      -lista de notificaciones (se acepto o no ene l viaje)
    -pasajero configuracion de pagos
      -como desea pagar
    -pasajero logout

    */