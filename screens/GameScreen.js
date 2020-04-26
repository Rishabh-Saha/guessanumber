import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import DefaultStyles from '../constants/defaultStyles';
import ResetButton from '../components/resetButton';
import MainButton from '../components/mainButton';
import Colors from '../constants/colors';
import BodyText from '../components/bodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max-min)) +  min;
    if(randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const renderPastGuesses = (eachGuess, index) => {
        return (
            <View key={index} style={styles.listItem}>
                <BodyText>#{index}</BodyText>
                <BodyText>{eachGuess}</BodyText>
            </View>
        );
}
const GameScreen = props => {
    const { userChoice, onEndGame } = props;
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if(currentGuess == userChoice) {
            onEndGame(pastGuesses.length);
        }
    },[currentGuess, onEndGame, userChoice]);  //By default, useEffect runs after every completed render, but you can choose to fire them only when certain values have changed.

    const nextGuessHandler = direction => {

        if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert("Don't Lie!!", "You know that you are lying.", [{text: "Sorry", style: "cancel", }]);
            return;
        }

        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        setPastGuesses(pastGuesses => [nextGuess, ...pastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computer's current guess is: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Entypo name="chevron-down" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                    <Entypo name="chevron-up" size={24} color="white"/>
                </MainButton>
                {/* <View style={styles.button}><Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')}/></View>
                <View style={styles.button}><Button title="Greater" onPress={nextGuessHandler.bind(this,'greater')}/></View> */}
            </Card>
            <ResetButton buttonTitle="Start Over" style={styles.resetContainer} { ...props }/>
            <View style={styles.listContainer}>
                <ScrollView >
                    {
                        pastGuesses.map((eachGuess, index) => renderPastGuesses(eachGuess, pastGuesses.length - index))
                    }
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        width: '40%'
    },
    resetContainer: {
        marginVertical: 30,
        backgroundColor: Colors.accent
    },
    listItem: {
        flexDirection: 'row',
        marginVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    listContainer: {
        width: '80%',
        flex: 1 // To make the list scrollable on android
    }
});

export default GameScreen;