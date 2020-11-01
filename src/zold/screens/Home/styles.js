import {Dimensions, StyleSheet, Platform} from 'react-native';
import styled, { css } from "styled-components/native";
/*
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    mapDrawerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get('window').height,
    width: 40,
    },
    header:{
        width:"100%",
        height:60,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20
    },
});*/

export const LocationBox = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;

  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 10px;
      margin-left: 10px;
    `
})}
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`;

export const LocationTimeBox = styled.View`
  background: #222;
  padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

export const LocationTimeSmal = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.select({
    ios: 60,
    android: 40
})};
  left: 20px;
`;
