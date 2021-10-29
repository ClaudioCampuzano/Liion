import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CreateStepOne from "../screens/createTrip/CreateStepOne";
import CreateStepTwo from "../screens/createTrip/CreateStepTwo";
import CreateStepThree from "../screens/createTrip/CreateStepThree";
import CreateStepFour from "../screens/createTrip/CreateStepFour";
import CreateStepFive from "../screens/createTrip/CreateStepFive";
import SucessScreen from "../screens/SucessScreen";

import { COLORS, hp, wp } from "../constants/styleThemes";

const CreateNavigator = () => {
  const CreateStack = createStackNavigator();
  return (
    <CreateStack.Navigator initialRouteName="CreateStepOne" >
      <CreateStack.Screen
        name="CreateStepOne"
        component={CreateStepOne}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitle: "",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerTitle: (props) => (
            <Image
              style={{
                width: wp("11.8"),
                height: hp("6.95"),
                tintColor: COLORS.WHITE,
              }}
              source={require("../../assets/images/miniLogo.png")}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("chat")}>
              <Entypo
                name="chat"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginRight: wp("3%") }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Entypo
                name="menu"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <CreateStack.Screen
        name="CreateStepTwo"
        component={CreateStepTwo}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <CreateStack.Screen
        name="CreateStepThree"
        component={CreateStepThree}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      />
      <CreateStack.Screen
        name="CreateStepFour"
        component={CreateStepFour}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainerEmpty,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                name="chevron-left"
                size={hp("5.5")}
                color={COLORS.TURKEY}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <CreateStack.Screen
        name="CreateStepFive"
        component={CreateStepFive}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainerEmpty,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                name="chevron-left"
                size={hp("5.5")}
                color={COLORS.TURKEY}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <CreateStack.Screen
        name="SucessScreen"
        component={SucessScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </CreateStack.Navigator>
  );
};

export default CreateNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.TURKEY,
    height: hp("7%"),
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp("3.5%"),
  },
  headerContainerEmpty: {
    height: hp("7%"),
    elevation: 0,
    backgroundColor: COLORS.WHITE,
  },
});
