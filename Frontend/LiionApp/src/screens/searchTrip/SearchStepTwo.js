import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ModalFilter from "../../components/ModalFilter";
import InputPicker from "../../components/InputPicker";
import ResultItemCard from "../../components/ResultItemCard";
import { GlobalContext } from "../../context/Provider";

const SearchStepTwo = ({ navigation, route }) => {
  const { userFirestoreData } = useContext(GlobalContext);

  const { addresses, date, time } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [resultOrder, setResultOrder] = useState("");

  const [preferences, setPreferences] = useState({
    baggage_hand: false,
    baggage_heavy: false,
    smoking: false,
    approvalIns: false,
    seeAll: true
  });
  console.log(preferences)

  const resultData = [
    {
      id: "1",
      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Carlos Elgueta",
        nRating: 14,
        sRating: 50,
      },

      travelData: {
        onlyMen: "false",
        onlyWoman: "true",
        allGender: "false",
        smoking: "true",
        approvalIns: "false",
        price: "3000",
        seatsAvaliable: "2",
        date: "20/11/2021",
        time: "22:43",
        duration: "10.7833333",
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Villa Alemana, Valparaiso",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: "0",
      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Luis Araya",
        nRating: 10,
        sRating: 50,
      },

      travelData: {
        onlyMen: "true",
        onlyWoman: "false",
        allGender: "false",
        smoking: "false",
        approvalIns: "true",
        price: "5000",
        seatsAvaliable: "3",
        date: "20/11/2021",
        time: "12:43",
        duration: "85.7833333",
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "San Fernando, Rancagua",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: "2",

      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Claudio Campuzano",
        nRating: 28,
        sRating: 50,
      },

      travelData: {
        onlyMen: "false",
        onlyWoman: "false",
        allGender: "true",
        smoking: "false",
        approvalIns: "true",
        price: "2000",
        seatsAvaliable: "1",
        date: "20/11/2021",
        time: "15:43",
        duration: "35.7833333",
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Quilpue, Valparaiso",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: "3",

      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Bryan Rosales",
        nRating: 20,
        sRating: 50,
      },

      travelData: {
        onlyMen: "false",
        onlyWoman: "true",
        allGender: "false",
        smoking: "false",
        approvalIns: "true",
        price: "1000",
        seatsAvaliable: "5",
        date: "20/11/2022",
        time: "10:43",
        duration: "20.7833333",
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Vallenar, Atacama",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
  ];

  const sortFilterResult = (myArray, typeOrder, gender) => {
    const order = myArray.sort((a, b) => {
      const result =
        typeOrder === "Precio"
          ? parseFloat(a.travelData.price) - parseFloat(b.travelData.price)
          : parseFloat(b.driverData.sRating / b.driverData.nRating) -
            parseFloat(a.driverData.sRating / a.driverData.nRating);
      return result;
    });
    if (gender === "Hombre")
      return order.filter((a) => {
        return (
          a.travelData.onlyMen === "true" || a.travelData.allGender === "true"
        );
      });
    else if (gender === "Mujer")
      return order.filter((a) => {
        return (
          a.travelData.onlyWoman === "true" || a.travelData.allGender === "true"
        );
      });
    else return order;
  };

  const searchCity = (myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].type === "locality") return myArray[i].long_name;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ResultItemCard
        item={item}
        onPress={() => navigation.navigate("SearchStepThree", item)}
      />
    );
  };

  return (
    <Layout>
      <ModalFilter
        visible={modalVisible}
        setModalVisible={setModalVisible}
        onChangePreferences={(value) => setPreferences(value)}
      />
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
          data={["Calificación", "Precio"]}
          label="Ordenar por"
        />
      </View>
      <View style={styles.middleView}>
        <FlatList
          data={sortFilterResult(
            resultData,
            resultOrder,
            userFirestoreData.gender
          )}
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
