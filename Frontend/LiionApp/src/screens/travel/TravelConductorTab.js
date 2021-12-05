import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import TabDownButton from "../../components/TabDownButton";
import { hp, wp } from "../../constants/styleThemes";

const TravelConductorTab = () => {
  return (
    <Layout>
      <View
        style={{
          height: hp("68%"),
          flexDirection: "column",
        }}
      >
        <Text>Viajes conductor</Text>
      </View>
      <View style={styles.buttonView}>
        <TabDownButton style={{ margin: 0 }} type={"travels"} sizeIcon={8} />
      </View>
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
