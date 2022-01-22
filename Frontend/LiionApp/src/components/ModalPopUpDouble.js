import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";
/**********************************************************************
 * Recibe por props todo lo del modal viejo pero ademas
 * tambien recive las 2 funciones a ejecutar por el modal
 * si no recibe ninguna simplemente se cierran
 * y tambien recibe los 2 textos de los botones 
 **********************************************************************/
import { COLORS, hp, wp } from "../constants/styleThemes"

const ModalPopUpDouble = ({ visible, children, setModalVisible, firstFunction, secondFunction, firstButtonText, secondButtonText }) => {
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

  const proceedFunction1 = () => {
    if (firstFunction) {
      firstFunction()
    }
    else {
      setModalVisible(false)
    }
  }

  const proceedFunction2 = () => {
    if (secondFunction) {
      secondFunction()
    }
    else {
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
          <View style={styles.orderButtons}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => proceedFunction1()}
          >
            <View style={styles.button1}>
              <Text style={styles.text21}>{firstButtonText}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => proceedFunction2()}
          >
            <View style={styles.button2}>
              <Text style={styles.text22}>{secondButtonText}</Text>
            </View>
          </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalPopUpDouble;

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
  text1: {
    fontSize: hp('2%'),
    color: COLORS.TURKEY,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
  text21: {
    fontSize: hp('2%'),
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
  text22: {
    fontSize: hp('2%'),
    color: COLORS.TURKEY,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
  button1: {
    backgroundColor: COLORS.UPTRAVEL_WARN,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: wp('25%'),
    height: hp('4.5%'),
  },
  button2: {
    borderRadius: 32,
    borderStyle:"solid",
    borderWidth:1,
    borderColor:COLORS.TURKEY,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: wp('25%'),
    height: hp('4.5%'),
  },
  orderButtons: {
    alignSelf:"center",
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-between",
    //backgroundColor:"red",
    width: wp('53%'),
    
  }
});