import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const CreateStepFour = ({ navigation, route }) => {
  const checkValidator = () => {
    navigation.navigate("CreateStepFive");
  };
  const sideIconSize = hp("6%");
  const mainIconSize = hp("12%");

  const [bagNumber, setBagNumber] = useState([0, 0, 0]);

  const changeBagNumber = (num, pos) => {
    let arr = [...bagNumber];
    let number = (arr[pos] += num);
    if (number >= 0 && number <= 5) {
      setBagNumber(arr);
    }
  };

  return (
    <Layout>
      <View style={styles.textSection}>
        <Text style={styles.title}>Agregar Equipaje</Text>
        <Text style={styles.desc}>
          Todos los pasajeros tienen derecho a almenos un equipage de manos, aca
          usted indica la cantidad de equipaje extra que dipsone fuera de los ya
          garantiza Liion
        </Text>
      </View>

      <View style={styles.iconsSection}>
        <View>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => changeBagNumber(-1, 0)}>
              <Feather
                style={styles.leftIcon}
                name="minus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
            <MaterialCommunityIcons
              name="bag-personal-outline"
              size={mainIconSize}
              color={COLORS.TURKEY}
            />
            <TouchableOpacity onPress={() => changeBagNumber(1, 0)}>
              <Feather
                style={styles.rightIcon}
                name="plus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.count}>{bagNumber[0]}</Text>
        </View>
        <View>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => changeBagNumber(-1, 1)}>
              <Feather
                style={styles.leftIcon}
                name="minus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
            <Feather
              name="briefcase"
              size={mainIconSize}
              color={COLORS.TURKEY}
            />
            <TouchableOpacity onPress={() => changeBagNumber(1, 1)}>
              <Feather
                style={styles.rightIcon}
                name="plus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.count}>{bagNumber[1]}</Text>
        </View>
        <View>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => changeBagNumber(-1, 2)}>
              <Feather
                style={styles.leftIcon}
                name="minus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
            <FontAwesome5
              name="suitcase-rolling"
              size={mainIconSize}
              color={COLORS.TURKEY}
            />
            <TouchableOpacity onPress={() => changeBagNumber(1, 2)}>
              <Feather
                style={styles.rightIcon}
                name="plus-circle"
                size={sideIconSize}
                color={COLORS.TURKEY}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.count}>{bagNumber[2]}</Text>
        </View>
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

export default CreateStepFour;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("4%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  headerContainerEmpty: {
    backgroundColor: COLORS.WHITE,
    height: hp("7%"),
    elevation: 0,
  },
  textSection: {
    flex: 6,
    alignItems: "center",
  },
  title: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: wp("6.5%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  desc: {
    fontFamily: "Gotham-SSm-Book",
    fontSize: wp("3.7%"),
    paddingTop: hp("5%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  iconsSection: {
    flex: 18,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  count: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: wp("5%"),
    paddingTop: hp("0%"),
    textAlign: "center",
    color: COLORS.BLACK,
  },
  leftIcon: {
    paddingRight: wp("6.5%"),
  },
  rightIcon: {
    paddingLeft: wp("6.5%"),
  },
});
