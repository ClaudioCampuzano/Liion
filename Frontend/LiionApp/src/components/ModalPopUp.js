import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";

const ModalPopUp = ({ visible, children, setModalVisible }) => {
  const [showModal, setShowModal] = React.useState(visible);
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

export default ModalPopUp;

const styles = StyleSheet.create({
  modalBackGround: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalContainer: {
    width: "70%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 52,
    elevation: 20,
  },
  text: {
    marginVertical: 30,
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Gotham-SSm-Medium",
    color: "#60BFB6",
  },
  text2: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
    margin: -12,
  },
  button: {
    backgroundColor: "#009999",
    borderRadius: 32,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    width: 159,
    height: 35,
  },
});
