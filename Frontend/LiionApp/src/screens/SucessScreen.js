import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../components/Layout";
import ButtonLiion from "../components/ButtonLiion";
import { COLORS, hp, wp } from "../constants/styleThemes";

const SucessScreen = ({ navigation, route }) => {
  const checkValidator = () => {
    navigation.navigate("MyTravelNavigator");
  };
  return (
    <Layout>
      <View>
        <Text>SucessScreen</Text>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Ingresar"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
