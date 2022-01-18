import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Layout from "../../components/Layout";
import TabDownButton from "../../components/TabDownButton";
import { hp, wp } from "../../constants/styleThemes";
import { getTravelsDriver } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";
import Loading from "../../components/Loading";
import { GlobalContext } from "../../context/Provider";
import TouchableIcon from "../../components/TouchableIcon";
import TravelResultsCard from "../../components/TravelResultsCard";

const TravelConductorTab = ({ navigation, route }) => {
  var reloadData = route.params ?? false;

  const { uid, userData } = useContext(GlobalContext);
  const [modalError, setModalError] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: dataFromApi,
    isLoading,
    isSuccess,
  } = useQuery(
    ["TravelsDriver", uid],
    () => getTravelsDriver({ driverUID: uid }),
    {
      onError: () => {
        setModalError(true);
      },
      staleTime: 10000,
    }
  );

  useEffect(() => {
    reloadData && queryClient.invalidateQueries("TravelsDriver");
  }, [reloadData]);

  const modalHandler = () => {
    navigation.goBack();
    setModalError(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TravelResultsCard
        item={{ ...item, carSeats: userData.driverData.carSeats }}
        driverOn={true}
        onPress={() => {
          if (item.status === "ongoing") {
            navigation.navigate("OngoingTravelDriver", { ...item });
          } else {
            navigation.navigate("TravelVisualizerDriver", {
              ...item,
              ...userData.driverData,
              nameDriver: userData.name + " " + userData.apellido,
              driverPhoto: userData.photo,
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
