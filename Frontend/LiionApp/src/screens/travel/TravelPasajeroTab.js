import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Layout from "../../components/Layout";
import TabDownButton from "../../components/TabDownButton";
import { hp, wp } from "../../constants/styleThemes";
import { getTravelsPassenger } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";
import Loading from "../../components/Loading";
import { GlobalContext } from "../../context/Provider";
import TouchableIcon from "../../components/TouchableIcon";
import TravelResultsCard from "../../components/TravelResultsCard";

const TravelPasajeroTab = ({ navigation, route }) => {
  var reloadData = route.params ?? false;

  const { uid } = useContext(GlobalContext);

  const [modalError, setModalError] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: dataFromApi,
    isLoading,
    isSuccess,
  } = useQuery(
    ["TravelsPassenger", uid],
    () => getTravelsPassenger({ passengerUID: uid }),
    {
      onError: () => {
        setModalError(true);
      },
      staleTime: 10000,
    }
  );

  useEffect(() => {
    reloadData && queryClient.invalidateQueries("TravelsPassenger");
  }, [reloadData]);

  const modalHandler = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TravelResultsCard
        item={item}
        driverOn={false}
        onPress={() => {
          if (item.status === "ongoing") {
            navigation.navigate("OngoingTravelPassenger", {
              ...item,
            });
          } else {
            navigation.navigate("TravelVisualizer", {
              ...item,
              reload: reloadData,
            });
          }
        }}
      />
    );
  };

  return (
    <Layout>
      {isLoading ? (
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
          {isSuccess && (
            <View
              style={[
                styles.middleView,
                dataFromApi.length === 0 && { justifyContent: "center" },
              ]}
            >
              {dataFromApi.length > 0 ? (
                <FlatList
                  data={dataFromApi}
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
          )}

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

export default TravelPasajeroTab;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("25%"),
    width: wp(100),
    justifyContent: "flex-end",
    paddingBottom: hp("1%"),
  },
  middleView: {
    height: hp("65.2%"),
    width: wp(90),
  },
});
