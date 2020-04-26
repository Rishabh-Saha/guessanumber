import React, { useState } from 'react';
import { View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,  //is an api
    Alert
} from 'react-native';

import Card from '../components/card';
import Colors from '../constants/colors';
import Input from '../components/input';
import NumberContainer from '../components/numberContainer';
import MainButton from '../components/mainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [numberConfirmed, setNumberConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetButtonHander = () => {
        setEnteredValue('');
        setNumberConfirmed(false);
    };

    const confirmButtonHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >99){
            Alert.alert(
                'Invalid Number',
                'Please input a valid number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetButtonHander }]
                );
            return;
        }

        setNumberConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(enteredValue); 
        // The only reason enteredValue is still accessible by setSelectedNumber 
        // even though it is being resetted in above line is because these setStates are batched together
        // and queued up to be executed next time the component re-renders.
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if(numberConfirmed){
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <Text>You have selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
            </Card>
    }

    return (
        <TouchableWithoutFeedback 
            onPress={()=> {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input 
                        style={styles.input}
                        blurOnSubmit={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetButtonHander} color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmButtonHandler} color={Colors.primaryTheme}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, //So that it takes up all the space the parent component can provide
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        width: '40%'
    },
    input : {
        width: 30,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;