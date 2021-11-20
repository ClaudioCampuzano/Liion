import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ModalFilter from "../../components/ModalFilter";
import InputPicker from "../../components/InputPicker";
import ResultItemCard from "../../components/ResultItemCard"

const SearchStepTwo = ({ navigation, route }) => {
  const { addresses, date, time } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [resultOrder, setResultOrder] = useState("");

  const resultData = [
    {
      id: "0",
      photo: 'https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
      nameConductor: "Luis Araya",

      nRating: 10,
      sRating: 50,
      price: "5000",
      seatsAvaliable: "3",
      date:'20/11/2021',
      time: "12:43",
      duration: "85.7833333",
      addresses:{
        origin: "Badajoz, Las Condes", destination: 'San Fernando, Rancagua'
      }
    },
    {
      id: "1",
      photo: 'https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
      nameConductor: "Carlos Elgueta",

      nRating: 14,
      sRating: 50,
      price: "3000",
      seatsAvaliable: "2",
      date:'20/11/2021',
      time: "22:43",
      duration: "10.7833333",
      addresses:{
        origin: "Badajoz, Las Condes", destination: 'Villa Alemana, Valparaiso'
      }
    },
    {
      id: "2",
      photo: 'https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
      nameConductor: "Claudio Campuzano",

      nRating: 28,
      sRating: 50,
      price: "2000",
      seatsAvaliable: "1",
      date:'20/11/2021',
      time: "15:43",
      duration: "35.7833333",
      addresses:{
        origin: "Badajoz, Las Condes", destination: 'Quilpue, Valparaiso'
      }
    },
    {
      id: "3",
      photo: 'https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
      nameConductor: "Bryan Rosales",

      nRating: 20,
      sRating: 50,
      price: "1000",
      seatsAvaliable: "5",
      date:'20/11/2022',
      time: "10:43",
      duration: "20.7833333",
      addresses:{
        origin: "Badajoz, Las Condes", destination: 'Vallenar, Atacama'
      }
    },
  ];

  const searchCity = (myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].type === "locality") return myArray[i].long_name;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ResultItemCard
        item={item}
        onPress={() => {console.log(item.id, 'Avista3')}}
      />
    );
  };

  return (
    <Layout>
      <ModalFilter visible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.titleView}>
        <Text style={styles.textAddress}>
          {searchCity(addresses.origin.address_components) +
            " a " +
            searchCity(addresses.destination.address_components)}
        </Text>
        <Text style={styles.textDate}>
          {moment(date, "DD-MM-YYYY").format("LL") +
            " a las " +
            moment(time, "hh:mm").format("LT")}
        </Text>
      </View>
      <View style={styles.supView}>
        <Text style={styles.numberTravelText}>
          {resultData.length + " viajes\ndisponibles"}
        </Text>
        <InputPicker
          style={styles.inputPicker}
          height={hp(6.2)}
          errorText={false}
          onSelect={(selectedItem, index) => setResultOrder(selectedItem)}
          value={resultOrder}
          data={["Fecha","Calificación", "Precio"]}
          label="Ordenar por"
        />
      </View>
      <View style={styles.middleView}>
        <FlatList
          data={resultData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    height: hp("9%"),
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
    height: hp("65.2%"),
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
    fontSize: hp(2),
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
