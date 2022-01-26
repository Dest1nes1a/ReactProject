import { Text, View , Button, SafeAreaView } from 'react-native';
import React from 'react';
import { styles } from '../components/styles';

const FirstPage = ({navigation}) => {
  return (
   <SafeAreaView style={{flex:1}}>
       <View style={{flex:1, padding:15}}>
            <View style={styles.container}>
                <Text style={styles.textTopStyle}>
                    This is the First Page
                </Text>
                <Button
                    title='Go to Second Page'
                    onPress={() => 
                        navigation.navigate('SecondPage')}
                >
                </Button>
                <Button
                    title='Go to Third Page'
                    onPress={() => 
                        navigation.navigate('ThirdPage')}
                >
                </Button>
            </View>
       </View>
   </SafeAreaView>
  );
};

export default FirstPage;
