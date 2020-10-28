import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../api/firebase';
import Bienvenida from '../Bienvenida/Bienvenida';

export default function logout() {
    
    
    firebase.auth()
    .signOut()
    .then(function() {
        console.log('loggedout')
        //navigation.navigate('Bienvenida')
      }).catch((error) => {
              console.log('ERROR un jiro en el sistema');
              console.log(error);
          });
    

    
}

