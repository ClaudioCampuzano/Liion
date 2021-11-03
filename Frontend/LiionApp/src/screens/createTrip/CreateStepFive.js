import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image} from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ShowTravel from "../../components/ShowTravel";

const CreateStepFive = ({ navigation, route }) => {
  const checkValidator = () => {
    const titulo = "¡Creación de viaje realizada!";
    const subTitulo =
      "Tu creación de viaje fue generada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes\n(conductor) en el home.";
    const initialRoute = "CreateStepOne";
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute,
    });
  };
  const vars = useRef({
    origin:"Rancagua, Region de Ohiggins",
    destiny:"San Fernando, Region de Ohiggins",
    nOfSeats:3,
    pricerPerSeat:4000,
    nofBags:[1,1,1],
    vehicle:{model:"Tesla Model X", color:"Blanco", patente:"ABCD12"}
  })
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.contentFive}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>Confirmación de creacion de viaje</Text>
          </View>
          <View style={styles.routeContainer}>
          <Text style={styles.rutaStyle} >Ruta</Text>
          <ShowTravel
                style={styles.inputLocation}
                timeStart="16:00"
                timeEnd="19:00"
                labelO={vars.current.origin}
                labelD={vars.current.destiny}
                dirTextSize={wp("2.5%")}
              />
          </View>
          <View style={styles.vehicleContainer}>
          <Image source={require('../../../assets/images/teslaX.png')} style={styles.teslaImage}/>
          <View>
          <Text style={styles.vehicleModelTitle}> {vars.current.vehicle.model}</Text>
          <Text style={styles.vehicleModelColor}>{vars.current.vehicle.patente}</Text>
          <Text style={styles.vehicleModelColor}>{vars.current.vehicle.color}</Text>
          </View>
          </View>
          <View style={styles.priceContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
          <View style={styles.bagsContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Confirmar viaje"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </View>
    </Layout>
  );
};

export default CreateStepFive;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("5%"),
    backgroundColor: "green",
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  contentFive: {
    flex: 9,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    backgroundColor: "green",
    flex: 1.1,
    justifyContent:"center",
    alignItems:"center",
    
    
  },
  titleStyle:{
    fontSize:wp("8%"),
    color:COLORS.TURKEY,
    textAlign:"center",
    marginHorizontal:wp("5%"),
    fontFamily: "Gotham-SSm-Medium",
  },
  rutaStyle:{
    fontSize:wp("5%"),
    color:COLORS.TURKEY,
    textAlign:"left",
    fontFamily: "Gotham-SSm-Bold",
  },
  routeContainer:{
    backgroundColor:"yellow",
    flex:0.9,
  },
  vehicleContainer:{
    backgroundColor:"green",
    flex:0.7,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:COLORS.GRAY,
  },
  vehicleModelTitle:{
    fontFamily: "Gotham-SSm-Medium",
    fontSize:wp("4%"),
  },
  vehicleModelColor:{
    fontFamily: "Gotham-SSm-Medium",
    fontSize:wp("3.5%"),
    marginLeft:wp("1.5%"),
  },
  teslaImage:{
    width:wp("25%"),
    height:hp("7%"),
    marginRight:wp("2%"),
  },
  priceContainer:{
    backgroundColor:"yellow",
    flex:1,
  },
  bagsContainer:{
    backgroundColor:"red",
    flex:1.2,
  },
  inputLocation: {
    width: wp("78.6%"),
    height: hp("12%"),
    alignSelf: "center",
    marginTop:-1*wp("2%"),
  },
});
