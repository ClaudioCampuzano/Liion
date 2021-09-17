import React, { useState,useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Layout from "../components/Layout";
import ButtonLiion from "../components/ButtonLiion";
import ModalPopUp from "../components/ModalPopUp";
import { fireLogout, isUserLoggedIn, testfunc } from "../firebase/Auth";
import { protectedRoute, unProtectedRoute } from "../api/api";
import { COLORS, DEVICE } from "../constants/styleThemes";

import { GlobalContext } from "../context/Provider";


const TestHomeScreen = ({ navigation }) => {

  const { logoutUser, uid, isLoggedIn } = useContext(GlobalContext);

  return (
    <Layout>

      <View style={styles.container}>
                <Text style={styles.textBienvenida}>{isLoggedIn}</Text>

        <Text style={styles.textSubBienvenida}>{uid}</Text>
        <View style={styles.ViewButton}>
          <ButtonLiion
            title="ruta backend auth"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => protectedRoute()}
          />
          <ButtonLiion
            title="ruta backend no auth"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => unProtectedRoute()}
          />
          <ButtonLiion
            title="Logout"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => logoutUser()}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  logo: {
    width: 260,
    height: "55%",
  },
  textBienvenida: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 30,
    color: COLORS.TURKEY,
    paddingTop: 10,
  },
  textSubBienvenida: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 25,
    color: COLORS.TURKEY,
    paddingTop: 25,
  },
  button: {
    width: 333,
    height: 40,
    padding: 16,
    margin: 5,
  },
  ViewButton: {
    flex: 1, 
    justifyContent: 'flex-end',
    marginBottom: 40 
  }
});

export default TestHomeScreen;
