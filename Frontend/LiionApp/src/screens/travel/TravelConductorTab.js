import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import TabDownButton from "../../components/TabDownButton";
import { hp, wp } from "../../constants/styleThemes";
import { getTravelsDriver } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";
import Loading from "../../components/Loading";
import { GlobalContext } from "../../context/Provider";

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

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              height: hp("68%"),
              flexDirection: "column",
            }}
          >
            <Text>{dataFromApi.length}</Text>
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
    height: hp("25%"),
    width: wp(100),
    justifyContent: "flex-end",
    paddingBottom: hp("1%"),
  },
});
