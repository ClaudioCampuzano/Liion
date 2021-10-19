import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";

const CreateStepOne = () => {
  const { userData, uid, isLoggedIn, userFirestoreData, getState2 } =
    useContext(GlobalContext);

  useEffect(() => {
    let flag =
      Object.keys(userFirestoreData).length !== 0 &&
      Object.getPrototypeOf(userFirestoreData) === Object.prototype;
    if (userFirestoreData && flag) {
      console.log(getState2);
    }
  }, [getState2]);

  return (
    <Layout>
      <View>
        <Text>Creando viaje</Text>
      </View>
    </Layout>
  );
};

export default CreateStepOne;

const styles = StyleSheet.create({});
