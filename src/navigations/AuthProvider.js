import React, { createContext, useState } from 'react';
import firebase from '../constants/firebase'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          register: async (email, password) => {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password);
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
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

