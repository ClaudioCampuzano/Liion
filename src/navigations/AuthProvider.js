import React, { createContext, useState, useEffect } from 'react';
import firebase from '../constants/firebase'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password)
              .then((res)=>{
                const uid = res.user.uid;
                
                console.log(uid);
                return uid
              }).then((uid)  => {
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).get().then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.")
                      return;
                  }
                  const user = firestoreDocument.data()
                  //console.log(user)
                  setUserobj(user)
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
                      setUserobj(userr)
                                 
                      const usersRef = firebase.firestore().collection('users')
                      usersRef
                          .doc(uid)
                          .set(userr)
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
          logout: async () => {
            try {
              await firebase.auth().signOut();
              setUserobj(null)
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

