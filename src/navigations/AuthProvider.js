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
              await firebase.auth().signInWithEmailAndPassword(email, password);
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
              setTipo('');
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

