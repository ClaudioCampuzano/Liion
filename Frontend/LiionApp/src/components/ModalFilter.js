import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";
import TouchableIcon from "./TouchableIcon";

import { COLORS, hp, wp } from "../constants/styleThemes";

const ModalFilter = (props) => {
  const { visible, gender, setModalVisible } = props;

  const [preferences, setPreferences] = useState({
    baggage_hand: false,
    baggage_heavy: false,
    smoking: false,
    noSmoking: false,
    approvalIns: false,
    gender: false,
    seeAll: true,
  });

  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const changePreferencesHandler = (field) => {
    let aux = { ...preferences };
    switch (field) {
      case "smoking":
        if (aux.smoking) {
          aux.smoking = false;
        } else {
          aux.smoking = true;
          aux.noSmoking = false;
          aux.seeAll = false;
        }
        break;
      case "noSmoking":
        if (aux.noSmoking) {
          aux.noSmoking = false;
        } else {
          aux.noSmoking = true;
          aux.smoking = false;
          aux.seeAll = false;
        }
        break;
      case "approvalIns":
        if (aux.approvalIns) {
          aux.approvalIns = false;
        } else {
          aux.approvalIns = true;
          aux.seeAll = false;
        }
        break;
      case "baggage_hand":
        if (aux.baggage_hand) {
          aux.baggage_hand = false;
        } else {
          aux.baggage_hand = true;
          aux.seeAll = false;
        }
        break;
      case "baggage_heavy":
        if (aux.baggage_heavy) aux.baggage_heavy = false;
        else {
          aux.baggage_heavy = true;
          aux.seeAll = false;
        }
        break;
      case "gender":
        if (aux.gender) aux.gender = false;
        else {
          aux.gender = true;
          aux.seeAll = false;
        }
        break;
      default:
        if (!aux.seeAll) {
          aux.seeAll = true;
          aux.smoking = false;
          aux.noSmoking = false;
          aux.gender = false;
          aux.approvalIns = false;
          aux.baggage_hand = false;
          aux.baggage_heavy = false;
        }
        break;
    }
    !aux.baggage_hand &&
      !aux.baggage_heavy &&
      !aux.smoking &&
      !aux.noSmoking &&
      !aux.approvalIns &&
      !aux.gender &&
      (aux.seeAll = true);
    setPreferences(aux);
  };

  useEffect(() => {
    props.onChangePreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Text style={styles.text_firstSection}>
            Equipaje extra permitido:
          </Text>
          <Text style={styles.text_firstSectionSub}>
            {"(Todos tienen derecho a un equipaje\n de mano)"}
          </Text>
          <View style={styles.viewIcon}>
            <TouchableIcon
              value={preferences.baggage_hand}
              type={"baggage_hand"}
              onPress={() => changePreferencesHandler("baggage_hand")}
              style={{}}
              sizeIcon={7}
            />
            <TouchableIcon
              value={preferences.baggage_heavy}
              type={"baggage_heavy"}
              onPress={() => changePreferencesHandler("baggage_heavy")}
              style={{}}
              sizeIcon={6}
            />
          </View>
          <Text style={styles.text_firstSection}>Preferencias:</Text>
          <View style={styles.viewIcon}>
            <TouchableIcon
              value={preferences.smoking}
              type={"smoking"}
              onPress={() => changePreferencesHandler("smoking")}
              style={{}}
              sizeIcon={6}
            />
            <TouchableIcon
              value={preferences.noSmoking}
              type={"noSmoking"}
              onPress={() => changePreferencesHandler("noSmoking")}
              style={{ marginLeft: wp(2) }}
              sizeIcon={6}
            />
          </View>

          <View style={styles.viewIcon}>
            {gender == "Hombre" ? (
              <TouchableIcon
                value={preferences.gender}
                type={"men"}
                onPress={() => changePreferencesHandler("gender")}
                style={{ marginLeft: wp(2) }}
                sizeIcon={6}
              />
            ) : (
              <TouchableIcon
                value={preferences.gender}
                type={"woman"}
                onPress={() => changePreferencesHandler("gender")}
                style={{ marginLeft: wp(2) }}
                sizeIcon={6}
              />
            )}

            <TouchableIcon
              value={preferences.approvalIns}
              type={"approval"}
              onPress={() => changePreferencesHandler("approvalIns")}
              style={{ marginLeft: wp(2) }}
              sizeIcon={6}
            />
          </View>
          <View style={styles.viewIcon}>
            <TouchableIcon
              value={preferences.seeAll}
              type={"seeAll"}
              onPress={() => changePreferencesHandler("seeAll")}
              style={{}}
              sizeIcon={6}
            />
          </View>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.button}>
              <Text style={styles.text2}>Aceptar</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalFilter;

const styles = StyleSheet.create({
  modalBackGround: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  viewIcon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: hp(1),
    marginBottom: hp(2.5),
  },
  modalContainer: {
    width: wp("80%"),
    backgroundColor: COLORS.WHITE,
    paddingVertical: hp("3%"),
    borderRadius: 52,
    elevation: 20,
  },
  text: {
    marginVertical: hp("3.6%"),
    fontSize: hp("2.1%"),
    textAlign: "center",
    fontFamily: "Gotham-SSm-Medium",
    marginHorizontal: wp("2%"),
    color: COLORS.TURKEY_CLEAR,
  },
  text2: {
    fontSize: hp("2%"),
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.TURKEY,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: wp("37.5%"),
    height: hp("4%"),
  },
  text_firstSection: {
    fontSize: hp("2%"),
    fontFamily: "Gotham-SSm-Bold",
    color: COLORS.BLACK,
    marginLeft: wp(5),
  },
  text_firstSectionSub: {
    fontSize: hp("1.5%"),
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
    marginLeft: wp(5),
  },
});
