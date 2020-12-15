import React, { createContext, useState, useEffect } from 'react';
import firebase from '../constants/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});




async function storeData(value)  {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('usersave', jsonValue)
  } catch (e) {
    // saving error
  }
}

async function removeItemValue(key) {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [flag, setFlag] = useState('')
    const [tipo, setTipo] = useState('');
    const [espasajero, setEspasajero] = useState('')
    const [esconductor, setEsconductor] = useState('')
    const [userobj, setUserobj] = useState(null)
    /*         nombre: '',
        apellido: '',
        run: '',
        email: '',
        cel: '',
        tipo_user:'', */
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          userobj,
          setUserobj,
          flag,
          setFlag,
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password)
              .then((res)=>{
                const uid = res.user.uid;
                
                //console.log(uid);
                return uid
              }).then((uid)  => {
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).get().then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.")
                      return;
                  }
                  const user = firestoreDocument.data()
                  setFlag('log')
                  //console.log(user)
                  //setUserobj(user)
                  //storeData(user)
              })

              }).
              
              catch(error => {
                alert(error)
              });
            } catch (e) {
              console.log(e);
            }
          },
          register: async (email, password, tipo) => {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then((response) =>{
                      const uid = response.user.uid
                      const data = {
                          id :uid,
                          email,
                          tipo,
                      };
                      setTipo(tipo);
                      const usersRef = firebase.firestore().collection('users')
                      usersRef
                          .doc(uid)
                          .set(data)
                          .then(() => {
                          })
                          .catch((error) => {
                              console.log(error);
                          });
              });
            } catch (e) {
              console.log(e);
            }
          },
          register2: async (userr, email, password) => {
            //console.log(email)
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then((response) =>{
                      const uid = response.user.uid
                      const data = {
                          id :uid,
                          email,
                          tipo,
                      };
                      //console.log(email)
                      userr.id= uid
                      userr.email=email
                      //setUserobj(userr)
                       //storeData(userr)
                                 
                      const usersRef = firebase.firestore().collection('users')
                      usersRef
                          .doc(uid)
                          .set(userr)
                          .then(() => {
                            setFlag('r2')
                          })
                          .catch((error) => {
                              console.log(error);
                          });
              });
            } catch (e) {
              console.log(e);
            }
          },
          getbyid: async (col, id) => {

            try{
              
              let colref = firebase.firestore().collection(col).doc(id);
              let getDoc = colref.get().then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  //console.log('Document data:', doc.data());
                  setUserobj(doc.data())
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
            
                
                

              
              
            }catch(e){
              console.log("Errorr" + e);
            }

          },

          actualizarDb: async (nombreColeccion, datos, id) =>{
            try{
              
              await firebase.firestore().collection(nombreColeccion).doc(id).set(datos).then(
                () => {setFlag('upd')})
              
              
            }catch(e){
              console.log("Error al actualizar" + e);
            }
          },

          insertarDb: async (nombreColeccion, datos, accion) => {
            try{
              await firebase.firestore().collection(nombreColeccion).add(datos).then(() => {setFlag(accion)})
            }catch(e){
              console.error("Error al crear: " + e);
            }
          },


          logout: async () => {
            try {
              await firebase.auth().signOut();
              //await removeItemValue('usersave')
              setUserobj(null)
              setFlag('logout')

            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

