import React from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logout from '../src/zold/screens/Login/logout'
import firebase from '../api/firebase'

import { CommonActions,  NavigationActions, StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useAuthFirebase from '../hooks/useAuthFirebase';
import Bienvenida from '../src/zold/screens/Bienvenida/Bienvenida';
//import { NavigationActions, StackActions } from 'react-navigation';

export default function DrawerContent({ navigation, user}){
    //console.log('ayuua22')
    //console.log(props)
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{user.fullName}</Title>
                                <Caption style={styles.caption}>{user.fullName}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Calificacion 5</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigation.navigate('Home')}}
                              
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Perfil"
                            onPress={() => {navigation.navigate('Perfil')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="UnirseViaje"
                            onPress={() => {navigation.navigate('Unirse a viajes')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="CrearViaje"
                            onPress={() => {navigation.navigate('Crear Viaje')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {Alert.alert(
                        //title
                        'Wena  King',
                        //body
                        'OK',
                        [
                            {
                                text: '',
                                onPress: async ()   =>  {
                                //user=false
                                
                                await firebase.auth().signOut().then(function() {
                                    console.log('A')
                                    navigation.dispatch(
                                        CommonActions.reset({
                                          index: 1,
                                          routes: [
                                            
                                            {
                                              name: 'exit',
                                              params: { user: '' },
                                            },
                                          ],
                                        })
                                      );
                                      navigation.navigate('exit')


                                  }).catch(function(error) {
                                    console.log('B')
                                    console.log(error)
                                  });
                                  
                                //const navigations = useNavigation();
                                //try{
                                    //await firebase.auth().signOut().then( () =>{
                                    // console.log('pan') 
                                      
                                     //navigation.reset({
                                     //    index: 0,
                                         //routes: [{name:'Bienvenido'}]
                                     //    routes: [{name:'exit'}]
                                    // })  })
                                    //})
                                   
                                    //await firebase.auth().onAuthStateChanged(user => {
                                    //    console.log(user)
                                    //}).then(async () => {
                                        //firebase.auth().signOut()
                                    //    console.log("aka")
                                    //})
                                    //console.log(userji)


                                
                                //} catch(e){
                                //    console.log('queso')
                                //    console.log(e)
                                    
                                //}

                                }
                            },
                            
                        ],
                        {cancelable: false},
                        //clicking out side of alert will not cancel
                    );   }}
                />


            
            
            </Drawer.Section>
        </View>
    );
}

jurout = async () => {
    try{
        await firebase.auth().signOut()
        navigation.reset({
            index: 0,
            routes: [{name:'Bienvenida'}]
        })
    }catch(e){
        console.log(e)
    }


}

/*
   <View>
      <Text>
        "Hola "{user.fullName}{"\n"}
        "Tu email es "{user.email}
      </Text>
    </View>
  )
}
*/

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
