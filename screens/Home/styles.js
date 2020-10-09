import {Dimensions, StyleSheet} from 'react-native';

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
});
