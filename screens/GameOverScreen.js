import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import Card from '../components/card';
import BodyText from '../components/bodyText';
import DefaultStyles from '../constants/defaultStyles';
import Colors from '../constants/colors';
import ResetButton from '../components/resetButton';

const GameOverScreen = props => {
    return (
        <ScrollView contentContainerStyle={styles.scrollScreen}>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>The game is over!!</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}
                        // source={{ uri: "https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"}}
                        style={styles.image}
                        resizeMode="cover"
                        fadeDuration={1000} />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.bodyText}>
                        Your phone needed <Text style={styles.highlight}>{props.totalRounds}</Text> rounds
                        to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                {/* You can nest a Text component within a Text component and the child text components inherit the styles from parent text component which is usually not the case for children components */}
                <ResetButton buttonTitle="Play Again" { ...props }/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollScreen: {
        flexGrow: 1
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        marginVertical: Dimensions.get("window").height / 30,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'
    },
    highlight: {
        color: Colors.accent,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginBottom: Dimensions.get("window").height / 30,
        marginHorizontal: 30
    },
    bodyText: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height < 600 ? 15 :20
    },
    buttonContainer: {
        width: "40%",
        padding: 1
    }
});

export default GameOverScreen;