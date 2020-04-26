import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import MainButton from './mainButton';

const ResetButton = props => {
    return (
        <MainButton style={{ ...styles.resetContainer, ...props.style }}onPress={props.startNewGame}>{props.buttonTitle}</MainButton>
    );
};

const styles = StyleSheet.create({
    resetContainer: {
        width: "40%"
    }
});

export default ResetButton;