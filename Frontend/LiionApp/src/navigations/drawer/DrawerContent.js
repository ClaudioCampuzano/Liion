import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, Title, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { COLORS, hp, wp } from "../../constants/styleThemes";
import { GlobalContext } from "../../context/Provider";
import { EmailVerification } from "../../firebase/Auth";

const DrawerContent = (props) => {
  const { logoutUser, userData } = useContext(GlobalContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.viewUserGlobal}>
          <View style={styles.viewUserInfo}>
            <Avatar.Image
              source={{
                uri: userData.photo,
              }}
              size={hp("12")}
            />
            <View style={styles.viewLabelName}>
              <Title style={styles.labelName}>
                {userData.name + " " + userData.apellido}
              </Title>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="stars"
                  size={hp("2.5")}
                  color={COLORS.TURKEY}
                />
                <Text style={styles.labelRankings}>
                  {userData.nRating == 0
                    ? 0
                    : Math.round(userData.sRating / userData.nRating)}
                  {"/5 - " + userData.nRating + " Calificaciones"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.touchablePerfil}
                onPress={() =>
                  userData &&
                  !userData.emailVerified &&
                  EmailVerification(userData.email)
                }
              >
                <Text style={styles.texTouchable}>
                  {userData && userData.emailVerified
                    ? "Email verificado"
                    : "Verificar email"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Drawer.Section style={{ paddingTop: hp("15"), elevation: 0 }}>
          {userData.status === "travelOn" && (
            <DrawerItem
              style={{ marginBottom: -hp("0.5") }}
              icon={() => (
                <MaterialCommunityIcons
                  name="car-arrow-left"
                  size={hp("3.5")}
                  color={COLORS.WARN_RED}
                />
              )}
              label="Viaje en curso"
              labelStyle={{ ...styles.labelDrawerItem, color: COLORS.WARN_RED }}
              onPress={() =>
                props.navigation.navigate("MyTravelNavigator", {
                  screen: "TravelTabNavigator",
                  params: {
                    screen: "TravelPasajeroTab",
                  },
                })
              }
            />
          )}

          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <Feather name="search" size={hp("3.5")} color={COLORS.TURKEY} />
            )}
            label="Buscar viaje"
            labelStyle={styles.labelDrawerItem}
            onPress={() => {
              props.navigation.navigate("SearchStack");
            }}
          />
          {userData.isDriver ? (
            <DrawerItem
              style={{ marginBottom: -hp("0.5") }}
              icon={() => (
                <Ionicons
                  name="ios-car-sport-outline"
                  size={hp("3.5")}
                  color={COLORS.TURKEY}
                />
              )}
              label="Crear viaje"
              labelStyle={styles.labelDrawerItem}
              onPress={() => {
                props.navigation.navigate("CreateNavigator");
              }}
            />
          ) : (
            <DrawerItem
              style={{ marginBottom: -hp("0.5") }}
              icon={() => (
                <Feather
                  name="clipboard"
                  size={hp("3.5")}
                  color={COLORS.TURKEY}
                />
              )}
              label="Registro de Conductor"
              labelStyle={styles.labelDrawerItem}
              onPress={() => {
                props.navigation.navigate("DriverSigninStack");
              }}
            />
          )}

          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <MaterialCommunityIcons
                name="routes"
                size={hp("3.5")}
                color={COLORS.TURKEY}
              />
            )}
            label="Mis viajes"
            labelStyle={styles.labelDrawerItem}
            onPress={() => {
              props.navigation.navigate("MyTravelNavigator");
            }}
          />
          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <MaterialIcons
                name="payment"
                size={hp("3.5")}
                color={COLORS.TURKEY}
              />
            )}
            label="Pagos"
            labelStyle={styles.labelDrawerItem}
            onPress={() => {}}
          />
          <DrawerItem
            style={{ marginBottom: -hp("0.5") }}
            icon={() => (
              <FontAwesome5
                name="history"
                size={hp("3.4")}
                color={COLORS.TURKEY}
              />
            )}
            label="Historial de viajes"
            labelStyle={styles.labelDrawerItem}
            onPress={() => {}}
          />
        </Drawer.Section>
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
          labelStyle={styles.labelDrawerItem}
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
          labelStyle={styles.labelDrawerItem}
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
          labelStyle={styles.labelDrawerItem}
          onPress={() => {
            logoutUser();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: hp("0"),
    borderTopColor: COLORS.BORDER_COLOR,
    borderTopWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  labelDrawerItem: {
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
    fontSize: hp("1.9"),
  },
  viewLabelName: {
    marginLeft: wp("2"),
    flexDirection: "column",
    flexShrink: 1,
  },
  labelName: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("1.8"),
    marginTop: hp("0.5"),
  },
  viewUserInfo: {
    flexDirection: "row",
    marginTop: hp("2"),
  },
  viewUserGlobal: {
    flex: 1,
    borderTopRightRadius: 40,
    width: wp("76"),
    paddingLeft: wp("2"),
    paddingBottom: hp("1"),
    borderBottomColor: COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  labelRankings: {
    paddingLeft: wp("1.5"),
    paddingTop: hp("0.2"),
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.7"),
    color: COLORS.BLACK,
  },
  texTouchable: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("1.7"),
    color: COLORS.LEAD,
  },
  touchablePerfil: {
    paddingTop: hp("0.5"),
    paddingBottom: hp("0.5"),
  },
});
