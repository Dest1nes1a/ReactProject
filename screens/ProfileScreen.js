import {View, Text ,StyleSheet} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={{flex:1, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold', margin: 30}}>
          You are on PROFILE SCREEN
        </Text>
      </View>

      <View style={{justifyContent:'flex-end'}}>
      <Text style = {{fontSize: 14, }}>www.tni.ac.th</Text>
    </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
