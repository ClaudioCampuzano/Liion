import {Button, Text, View} from "react-native";
import React from "react";

export default function Perfil({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Perfil!</Text>
            <Button
                onPress={() => navigation.goBack()}
                title="Go back home"
            />
        </View>
    );
}
