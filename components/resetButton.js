import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';

import MainButton from './mainButton';

const ResetButton = props => {
    return (
        <MainButton style={{ ...styles.resetContainer, ...props.style }}onPress={props.startNewGame}>{props.buttonTitle}</MainButton>
    );
};

const styles = StyleSheet.create({
    resetContainer: {
        width: Dimensions.get("window").width > 350 ? "40%" : Dimensions.get("window").width / 2,
        alignItems: 'center'
    }
});

export default ResetButton;