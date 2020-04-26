import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState(); 
  const [guessRounds, setGuessRounds] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }


  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const endGameHandler = noOfRounds => {
    setGuessRounds(noOfRounds);
  };

  const configureNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let currentScreen = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessRounds <= 0) {
    currentScreen = <GameScreen userChoice={userNumber} onEndGame={endGameHandler} startNewGame={configureNewGameHandler}/>
  } else if(guessRounds > 0) {
    currentScreen = <GameOverScreen totalRounds={guessRounds} userNumber={userNumber} startNewGame={configureNewGameHandler}/>
  }


  return (
    <View style={styles.container}>
      <Header title="Guess a number" />
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
