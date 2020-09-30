import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from '../../../api/firebase';
import 'firebase/firestore';
import styles from './styles';

export default function Login_phone({navigation}){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const regxp = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
        if(regxp.test(phoneNumber)){
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider
                .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
                .then(setVerificationId);
        }else{
            alert('Numero invalido')
        }
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) =>{
                alert(error)
            });
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={Constants.manifest.extra.firebase}
                />
                <TextInput
                    placeholder="+56952521134"
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    style={styles.textInput}
                />
                <TouchableOpacity
                    style={styles.sendVerification}
                    onPress={sendVerification}
                >
                    <Text style={styles.buttonText}>Enviar verificación</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="Codigo de confirmacion"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendCode} onPress={confirmCode} /*onPress={confirmCode}*/>
                    <Text style={styles.buttonText}>Enviar verificación</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
