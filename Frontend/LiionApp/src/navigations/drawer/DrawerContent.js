import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, hp, wp } from "../../constants/styleThemes";

export const DrawerContent = (props) => {
  const [fontsLoaded, error] = useFonts({
    "Gotham-SSm-Bold": require("../../../assets/fonts/GothamSSm-Bold.ttf"),
    "Gotham-SSm-Book": require("../../../assets/fonts/GothamSSm-Book.ttf"),
    "Gotham-SSm-Medium": require("../../../assets/fonts/GothamSSm-Medium.ttf"),
  });
  return (
    fontsLoaded && (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View>
            <Text style={{ fontFamily: "Gotham-SSm-Bold" }}>Contenido</Text>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <Ionicons
                name="help-circle-outline"
                size={hp("3.5")}
                color={COLORS.TURKEY}
              />
            )}
            label="Ayuda"
            labelStyle={styles.labelStyle}
            onPress={() => {}}
          />
          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <MaterialIcons
                name="settings"
                size={hp("3.5")}
                color={COLORS.TURKEY}
              />
            )}
            label="Configuraciones"
            labelStyle={styles.labelStyle}
            onPress={() => {}}
          />
          <DrawerItem
            icon={() => (
              <Ionicons
                name="exit-outline"
                size={hp("3.5")}
                color={COLORS.TURKEY}
              />
            )}
            label="Cerrar sesion"
            labelStyle={styles.labelStyle}
            onPress={() => {}}
          />
        </Drawer.Section>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 5,
    borderTopColor: COLORS.BORDER_COLOR,
    borderTopWidth: 1,
  },
  labelStyle: {
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
    fontSize: hp("2"),
  },
});
