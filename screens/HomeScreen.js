import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


const HomeScreen = ({navigation}) => {

  return (
    <View style={{flex:1, alignItems: 'center'}}>
      <View style={styles.container}>
      <Text style= {{fontSize: 30, fontWeight: 'bold', margin: 30}}>HOME SCREEN</Text>
      <Button 
        title="Go to SETTING TAB"
        onPress={()=> navigation.navigate('SettingScreen')}
      />

      <Button title="Go to NEWS SCREEN"/>

    </View>
    <View style={{justifyContent:'flex-end'}}>
      <Text style = {{fontSize: 14, }}>www.tni.ac.th</Text>
    </View>
    
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
