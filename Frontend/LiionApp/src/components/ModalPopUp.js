import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";

import {COLORS,  hp, wp} from "../constants/styleThemes"

const ModalPopUp = ({ visible, children, setModalVisible, customFunction }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
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

  const proceedFunction = () =>{
    if (customFunction){
      customFunction()
    }
    else{
      setModalVisible(false)
    }
  }

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Text style={styles.text}>{children}</Text>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => proceedFunction()}
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

export default ModalPopUp;

const styles = StyleSheet.create({
  modalBackGround: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalContainer: {
    width: wp('80%'),
    backgroundColor: COLORS.WHITE,
    paddingVertical: hp('3%'),
    borderRadius: 52,
    elevation: 20,
  },
  text: {
    marginVertical: hp('3.6%'),
    fontSize: hp('2.1%'),
    textAlign: "center",
    fontFamily: "Gotham-SSm-Medium",
    marginHorizontal: wp('2%'),
    color: COLORS.TURKEY_CLEAR,
  },
  text2: {
    fontSize: hp('2%'),
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
    width: wp('37.5%'),
    height: hp('4.5%'),
  },
});
