import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SettingScreen = ({navigation}) => {
  return (
    <View style = {{flex:1, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold', margin: 30}}>
          SETTING SCREEN
        </Text>
        <Button
          title="Go to HOME TAB"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Button title="Go to NEWS SCREEN" />
        <Button
          title="Go to PROFILE SCREEN"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 14}}>www.tni.ac.th</Text>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});