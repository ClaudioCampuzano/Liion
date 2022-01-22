import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const CreateStepFour = ({ navigation, route }) => {
  const checkValidator = () => {
    navigation.navigate("CreateStepFive", {
      ...route.params,
      extraBaggage: { personalItem: bagNumber[0], bigBags: bagNumber[1] },
    });
  };
  const sideIconSize = hp("5%");
  const mainIconSize = hp("9.5%");

  const [bagNumber, setBagNumber] = useState([0, 0]);

  const changeBagNumber = (num, pos) => {
    let arr = [...bagNumber];
    let number = (arr[pos] += num);
    if (number >= 0 && number <= 5) {
      setBagNumber(arr);
    }
  };

  return (
    <Layout>
      <View style={{ height: hp("78%") }}>
        <View style={styles.textSection}>
          <Text style={styles.title}>Agregar Equipaje</Text>
          <Text style={styles.desc}>
            {
              "Indique el equipaje de mano,\nbolsos o maletas que permitirá\nen su viaje."
            }
          </Text>
          <Text
            style={{
              ...styles.desc,
              paddingTop: hp("0%"),
              fontSize: hp("1.8%"),
            }}
          >
            {"(Todos tienen derecho a un equipaje de mano)"}
          </Text>
        </View>

        <View style={styles.iconsSection}>
          <View>
            <Text style={styles.badTitle}>
              Equipaje de mano o articulo personal{" "}
            </Text>
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
            <Text style={styles.badDesc}>Dimensiones maximas </Text>
            <Text style={styles.badDesc}>55x35x25 cm</Text>
            <Text style={styles.count}>{bagNumber[0]}</Text>
          </View>
          <View>
            <Text style={styles.badTitle}>Maletas de viaje </Text>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => changeBagNumber(-1, 1)}>
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
              <TouchableOpacity onPress={() => changeBagNumber(1, 1)}>
                <Feather
                  style={styles.rightIcon}
                  name="plus-circle"
                  size={sideIconSize}
                  color={COLORS.TURKEY}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.badDesc}>Todo lo que supere </Text>
            <Text style={styles.badDesc}>las medidas anteriores </Text>
            <Text style={styles.count}>{bagNumber[1]}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonView}>
        <ButtonLiion
          title="Siguiente"
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
    height: hp("15%"),
    justifyContent: "flex-end",
    paddingBottom: hp("6%"),
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
    marginBottom: hp("8"),
  },
  title: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    paddingTop: hp("2%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  desc: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.4%"),
    paddingTop: hp("6%"),
    textAlign: "center",
    color: COLORS.TURKEY_CLEAR,
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
  badDesc: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3%"),
    paddingTop: hp("0%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  badTitle: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: wp("3.5%"),
    marginBottom: hp("1.5%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  leftIcon: {
    paddingRight: wp("6.5%"),
  },
  rightIcon: {
    paddingLeft: wp("6.5%"),
  },
});
