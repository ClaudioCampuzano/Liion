import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import Layout from "../../components/Layout";
import TabDownButton from "../../components/TabDownButton";
import { hp, wp } from "../../constants/styleThemes";
import { getTravelsDriver } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";
import Loading from "../../components/Loading";
import { GlobalContext } from "../../context/Provider";
import TouchableIcon from "../../components/TouchableIcon";
import TravelResultsCard from "../../components/TravelResultsCard";

const TravelConductorTab = () => {
  const { uid } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState(false);
  const [dataFromApi, setDataFromApi] = useState([]);

  useEffect(() => {
    (async function () {
      const [resFlag, resMsg] = await getTravelsDriver(uid);
      resFlag ? setDataFromApi(resMsg) : setModalError(true);
      setLoading(false);
    })();
  }, []);

  const modalHandler = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TravelResultsCard
        item={item}
        driverOn={true}

/*         onPress={() =>
          navigation.navigate("SearchStepThree", { ...item, addresses })
        } */
      />
    );
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalPopUp
            visible={modalError}
            setModalVisible={setModalError}
            customFunction={modalHandler}
          >
            Error al intentar recuperar datos, intente en otro momento
          </ModalPopUp>

          <View
            style={[
              styles.middleView,
              dataFromApi.length === 0 && { justifyContent: "center" },
            ]}
          >
            {dataFromApi.length > 0 ? (
              <></>
            ) : (
              /*               <FlatList
                data={dataFromApi}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              /> */
              <TouchableIcon
                value={true}
                type={"sadFace"}
                style={{}}
                sizeIcon={7}
              />
            )}
          </View>

          <View style={styles.buttonView}>
            <TabDownButton
              style={{ margin: 0 }}
              type={"travels"}
              sizeIcon={8}
            />
          </View>
        </>
      )}
    </Layout>
  );
};

export default TravelConductorTab;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    width: wp(100),
    justifyContent: "flex-end",
    paddingBottom: hp("1%"),
  },
  middleView: {
    height: hp("71%"),
    width: wp(90),
  },
});
