import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ModalFilter from "../../components/ModalFilter";
import InputPicker from "../../components/InputPicker";

const SearchStepTwo = ({ navigation, route }) => {
  const { addresses, date, time } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [resultOrder, setResultOrder] = useState("");


  const checkValidator = () => {
    navigation.navigate("SearchStepThree");
  };

  return (
    <Layout>
      <ModalFilter visible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.supView}>
        <Text>Sup</Text>
        <InputPicker
              style={styles.inputPicker}
              height={hp(6.2)}
              errorText={false}
              onSelect={(selectedItem, index) =>
                setResultOrder(selectedItem)
              }
              value={resultOrder}
              data={["Calificación", "Precio"]}
              label="Ordenar por"
        />
      </View>
      <View style={styles.middleView}>
        <Text>middle</Text>
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
    backgroundColor:'yellow',

  },
  supView:{
    height: hp("15%"),
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  middleView:{
    backgroundColor:'green',
    height: hp("68.2%"),
    width: wp(90),
  },
  inputPicker: {
    width: wp("31%"),
    alignSelf: "center",
    marginRight: wp(5)
  },
});
