import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
});

const WelcomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Navigation Drilldown Example!
    </Text>
  </View>
);

export default WelcomeScreen;
