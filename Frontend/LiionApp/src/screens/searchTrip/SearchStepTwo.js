import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ModalFilter from "../../components/ModalFilter";

const SearchStepTwo = ({ navigation, route }) => {
  const { addresses, date, time } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const checkValidator = () => {
    navigation.navigate("SearchStepThree");
  };

  return (
    <Layout>
      <View>
        <ModalFilter visible={modalVisible} setModalVisible={setModalVisible} />
        <Text>ETAPA DOS</Text>
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
