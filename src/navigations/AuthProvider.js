import React, { createContext, useState } from 'react';
import firebase from '../constants/firebase'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tipo, setTipo] = useState('');
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          tipo,
          setTipo,
        
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password)
              .then((res)=>{
                const uid = res.user.uid;
                return uid
              }).then((uid)  => {
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).get().then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.")
                      return;
                  }
                  const user = firestoreDocument.data()
                  setTipo(user.tipo)
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
          logout: async () => {
            try {
              await firebase.auth().signOut();
            } catch (e) {
              console.error(e);
            }
          },
          insertarDb: async (nombreColeccion, datos) => {
            try{
              await firebase.firestore().collection(nombreColeccion).add(datos);
            }catch(e){
              console.error("Error al crear: " + e);
            }
          },
          actualizarDb: async (nombreColeccion, datos, id) =>{
            try{
              await firebase.firestore().collection(nombreColeccion).doc(id).set(datos);
            }catch(e){
              console.log("Error al actualizar" + e);
            }
          },
          eliminarDb: async(nombreColeccion, id) => {
            try{
              await firebase.firestore().collection(nombreColeccion).doc(id).delete();
            }catch(e){
              console.log("Error al eliminat "+ e)
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

