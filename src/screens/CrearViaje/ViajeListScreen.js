import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "../../constants/firebase";
import { ListItem, Avatar } from "react-native-elements";

const ViajeListScreen = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.firestore().collection('users').onSnapshot(querySnapshot => {
        const users = [];

            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            });

            setUsers(users)
        })
    }, [])

    return (
        <ScrollView>
            <Button
                title="Crear Viaje"
                onPress={() => props.navigation.navigate('CrearViajeScreen')}
            />

            {
                users.map(user => {
                    return(
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            props.navigation.navigate('DetallesViajeScreen', {
                                userId: user.id
                            })
                        }}>
                            <ListItem.Chevron/>
                            <Avatar
                                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default ViajeListScreen