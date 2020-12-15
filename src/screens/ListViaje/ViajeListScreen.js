import React, { useEffect, useState } from 'react'
import { Button, View, Text , StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "../../constants/firebase";
import { ListItem, Avatar } from "react-native-elements";

const ViajeListScreen = (props) => {

    const [viajes, setViajes] = useState([])

    useEffect(() => {
        firebase.firestore().collection('viajes').onSnapshot(querySnapshot => {
            const viajes = [];
            querySnapshot.docs.forEach(doc => {
                const { conductorId, conductorN, conductorA, cupos, destino, origen, fecha, preciototal, precioindividual, desc  } = doc.data()
                viajes.push({
                    id: doc.id,
                    conductorId,
                    conductorN,
                    conductorA,
                    cupos,
                    destino,
                    origen,
                    fecha,
                    preciototal,
                    precioindividual,
                    desc
                })
            });
            setViajes(viajes)
        })
    }, [])



    //console.log(viajes)
    return (
        <ScrollView>
        {
            viajes.map(viaje => {
                return(
                    <ListItem key={viaje.id} bottomDivider onPress={() => {
                        props.navigation.navigate('DetallesViajeScreen', {
                            userId: viaje.id
                        })
                    }}>
                        <ListItem.Chevron/>
                        <Avatar
                            source={{uri: 'https://image.freepik.com/vector-gratis/mapa-geografico-mundo-politico-coloreado_23-2148313098.jpg'}}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{viaje.conductorN} {viaje.conductorA}</ListItem.Title>
                            <ListItem.Subtitle>{viaje.desc}</ListItem.Subtitle>
                           
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }
    </ScrollView>
    )
}




const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f1'
    },
    text: {
      fontSize: 20,
      color: '#333333',
      marginBottom: 50
    }
  });


export default ViajeListScreen