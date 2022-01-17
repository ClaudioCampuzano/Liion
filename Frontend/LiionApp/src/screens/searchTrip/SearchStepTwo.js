import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery } from "react-query";
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
  const { userData, uid } = useContext(GlobalContext);
  const { addresses, date, time } = route.params;
  //const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultOrder, setResultOrder] = useState("");
  const [lengthDataReady, setLengthDataReady] = useState(0);
  const [preferences, setPreferences] = useState({
    baggage_hand: false,
    baggage_heavy: false,
    gender: false,
    smoking: false,
    noSmoking: false,
    approvalIns: false,
    seeAll: true,
  });

  const searchCity = (myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].type === "locality") return myArray[i].long_name;
    }
  };

  const {
    data: dataFromApi,
    isSuccess,
    isFetching,
    isLoading: loading,
    isError,
  } = useQuery(
    [
      "Travels",
      uid,
      searchCity(addresses.destination.address_components),
      searchCity(addresses.origin.address_components),
      date,
      time,
      userData.gender,
    ],
    () =>
      getTravels({
        uid: uid,
        localityDestination: searchCity(
          addresses.destination.address_components
        ),
        localityOrigin: searchCity(addresses.origin.address_components),
        date: date,
        time: time,
        genderApplicant: userData.gender,
      }),
    {
      onError: () => setModalError(true),
    }
  );

  useEffect(() => {
    if (isSuccess && dataFromApi.length > 0) {
      let listReady = sortFilterResult(
        dataFromApi,
        resultOrder,
        userData.gender
      );
      setResultData(listReady);
      setLengthDataReady(listReady.length);
    }
  }, [dataFromApi, preferences, resultOrder]);

  const sortFilterResult = (myArray, typeOrder, gender) => {
    ///Ordenar por precio o por precio
    let order = myArray.sort((a, b) => {
      const result =
        typeOrder === "Precio"
          ? parseFloat(a.costPerSeat) - parseFloat(b.costPerSeat)
          : parseFloat(b.sRating / b.nRating) -
            parseFloat(a.sRating / a.nRating);
      return result;
    });

    //Filtro de genero
    if (gender === "Hombre")
      order = order.filter((a) => {
        return preferences.gender
          ? a.genderPreference === "onlyMen"
          : a.genderPreference === "onlyMen" ||
              a.genderPreference === "allGender";
      });
    else if (gender === "Mujer")
      order = order.filter((a) => {
        return preferences.gender
          ? a.genderPreference === "onlyWoman"
          : a.genderPreference === "onlyWoman" ||
              a.genderPreference === "allGender";
      });

    if (preferences.noSmoking)
      order = order.filter((a) => {
        return !a.smoking;
      });
    if (preferences.smoking)
      order = order.filter((a) => {
        return a.smoking;
      });
    if (preferences.approvalIns)
      order = order.filter((a) => {
        return a.approvalIns;
      });

    if (preferences.baggage_hand)
      order = order.filter((a) => {
        return a.extraBaggage.personalItem > 0;
      });

    if (preferences.baggage_heavy)
      order = order.filter((a) => {
        return a.extraBaggage.bigBags > 0;
      });
    return order;
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalFilter
            visible={modalVisible}
            setModalVisible={setModalVisible}
            onChangePreferences={(value) => setPreferences(value)}
            gender={userData.gender}
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
                " desde las " +
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
