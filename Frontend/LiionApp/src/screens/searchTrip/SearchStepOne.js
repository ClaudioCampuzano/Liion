import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";

const SearchStepOne = ({ navigation }) => {
  return (
    <Layout>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("SeachStepTwo")}>
          <Text>Go to two</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SearchStepOne;

const styles = StyleSheet.create({});
