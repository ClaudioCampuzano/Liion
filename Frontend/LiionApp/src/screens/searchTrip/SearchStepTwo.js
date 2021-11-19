import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ModalFilter from "../../components/ModalFilter";
import InputPicker from "../../components/InputPicker";

const SearchStepTwo = ({ navigation, route }) => {
  const { addresses, date, time } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [resultOrder, setResultOrder] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*   const checkValidator = () => {
    navigation.navigate("SearchStepThree");
  }; */

  const sourcesCity = "Quilpue";
  const destinyCity = "Las Condes";
  const DATE = "4 de diciembre";
  const cnt_viaje = 3;
  const resultData = [
    {
      id: '0',
      nameConductor: "Luis Araya",
      price: "5000",
      asientoDisp: "3",
      origin: "Badajoz, Las Condes",
      destiny: "San Fernando, Rancagua",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: '1',
      nameConductor: "Carlos Elgueta",
      price: "5000",
      asientoDisp: "3",
      origin: "Badajoz, Las Condes",
      destiny: "Villa Alemana, Valparaiso",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: '2',
      nameConductor: "Claudio Campuzano",
      price: "5000",
      asientoDisp: "3",
      origin: "Badajoz, Las Condes",
      destiny: "Quilpue, Valparaiso",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: '3',
      nameConductor: "Bryan Rosales",
      price: "5000",
      asientoDisp: "3",
      origin: "Badajoz, Las Condes",
      destiny: "Vallenar, Atacama",
      startTime: "11:00",
      endTime: "12:00",
    }
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        backgroundColor,
      ]}
    >
      <Text style={[{ fontSize: 32 }, textColor]}>{item.nameConductor}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <Layout>
      <ModalFilter visible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.titleView}>
        <Text style={styles.textAddress}>
          {sourcesCity + " a " + destinyCity}
        </Text>
        <Text style={styles.textDate}>{DATE}</Text>
      </View>
      <View style={styles.supView}>
        <Text style={styles.numberTravelText}>
          {cnt_viaje + " viajes\ndisponibles"}
        </Text>
        <InputPicker
          style={styles.inputPicker}
          height={hp(6.2)}
          errorText={false}
          onSelect={(selectedItem, index) => setResultOrder(selectedItem)}
          value={resultOrder}
          data={["Calificación", "Precio"]}
          label="Ordenar por"
        />
      </View>
      <View style={styles.middleView}>
        <FlatList
          data={resultData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Filtrar"
          styleView={styles.button}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </Layout>
  );
};

export default SearchStepTwo;

const styles = StyleSheet.create({
  button: {
    width: wp("40%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  buttonView: {
    flex: 1,
    height: hp("9.8%"),
    width: wp(90),
    justifyContent: "flex-end",
    paddingBottom: hp("5%"),
  },
  titleView: {
    height: hp("7%"),
    width: wp(90),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  supView: {
    height: hp("9%"),
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middleView: {
    height: hp("67.2%"),
    width: wp(90),
  },
  inputPicker: {
    width: wp("31%"),
    alignSelf: "center",
  },
  numberTravelText: {
    alignSelf: "center",
    fontFamily: "Gotham-SSm-Bold",
    color: COLORS.LEAD,
    fontSize: hp(2.1),
  },
  textAddress: {
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp(2.5),
    color: COLORS.LEAD,
  },
  textDate: {
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp(2),
    color: COLORS.LEAD,
  },
});
