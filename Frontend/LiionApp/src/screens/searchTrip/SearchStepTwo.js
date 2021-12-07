import React, { useState, useContext, useEffect } from "react";
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
import TouchableIcon from "../../components/TouchableIcon";
import Loading from "../../components/Loading";
import { getTravels } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";

const SearchStepTwo = ({ navigation, route }) => {
  const { userFirestoreData, accesstoken } = useContext(GlobalContext);
  const { addresses, date, time } = route.params;
  const [waitingLogin, setWaitingLogin] = useState(true);

  var resultDataHard = [];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultOrder, setResultOrder] = useState("");
  const [lengthDataReady, setLengthDataReady] = useState(0);

  useEffect(() => {
    (async function () {
      var dataRequest = {
        atoken: accesstoken,
        addresses: addresses,
        date: date,
        time: time,
      };

      const [resFlag, resMsg] = await getTravels(dataRequest);
      resFlag ? resultDataHard = resMsg : setModalError(true);
      setWaitingLogin(false);
    })();
  }, []);

  const [preferences, setPreferences] = useState({
    baggage_hand: false,
    baggage_heavy: false,
    gender: false,
    smoking: false,
    noSmoking: false,
    approvalIns: false,
    seeAll: true,
  });
  useEffect(() => {
    let listReady = sortFilterResult(
      resultDataHard,
      resultOrder,
      userFirestoreData.gender
    );
    setResultData(listReady);
    setLengthDataReady(listReady.length);
  }, [preferences, resultOrder]);

  const sortFilterResult = (myArray, typeOrder, gender) => {
    ///Ordenar por precio o por precio
    let order = myArray.sort((a, b) => {
      const result =
        typeOrder === "Precio"
          ? parseFloat(a.travelData.price) - parseFloat(b.travelData.price)
          : parseFloat(b.driverData.sRating / b.driverData.nRating) -
            parseFloat(a.driverData.sRating / a.driverData.nRating);
      return result;
    });

    //Filtro de genero
    if (gender === "Hombre")
      order = order.filter((a) => {
        return preferences.gender
          ? a.travelData.onlyMen
          : a.travelData.onlyMen || a.travelData.allGender;
      });
    else if (gender === "Mujer")
      order = order.filter((a) => {
        return preferences.gender
          ? a.travelData.onlyWoman
          : a.travelData.onlyWoman || a.travelData.allGender;
      });

    if (preferences.noSmoking)
      order = order.filter((a) => {
        return !a.travelData.smoking;
      });
    if (preferences.smoking)
      order = order.filter((a) => {
        return a.travelData.smoking;
      });
    if (preferences.approvalIns)
      order = order.filter((a) => {
        return a.travelData.approvalIns;
      });

    if (preferences.baggage_hand)
      order = order.filter((a) => {
        return a.travelData.personalItem > 0;
      });

    if (preferences.baggage_heavy)
      order = order.filter((a) => {
        return a.travelData.bigBags > 0;
      });
    return order;
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
        onPress={() =>
          navigation.navigate("SearchStepThree", { ...item, addresses })
        }
      />
    );
  };

  const modalHandler = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  return (
    <Layout>
      {waitingLogin ? (
        <Loading />
      ) : (
        <>
          <ModalFilter
            visible={modalVisible}
            setModalVisible={setModalVisible}
            onChangePreferences={(value) => setPreferences(value)}
            gender={userFirestoreData.gender}
          />
            <ModalPopUp
              visible={modalError}
              setModalVisible={setModalError}
              customFunction={modalHandler}
            >
              Error al intentar recuperar datos, intente en otro momento
            </ModalPopUp>
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
          <View
            style={[
              styles.middleView,
              lengthDataReady === 0 && { justifyContent: "center" },
            ]}
          >
            {lengthDataReady > 0 ? (
              <FlatList
                data={resultData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <TouchableIcon
                value={true}
                type={"sadFace"}
                style={{}}
                sizeIcon={7}
              />
            )}
          </View>
          <View style={styles.buttonView}>
            <ButtonLiion
              title="Filtrar"
              styleView={styles.button}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </>
      )}
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
