import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style }}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryTheme,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 25
    },
    buttonText: {
        fontFamily: 'open-sans',
        fontSize: 15,
        color: 'white'
    }
});

export default MainButton;