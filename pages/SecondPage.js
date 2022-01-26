import { Text, View , Button, SafeAreaView } from 'react-native';
import React from 'react';
import { styles } from '../components/styles';

const SecondPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1}}>
       <View style={{flex:1, padding:15}}>
            <View style={styles.container}>
                <Text style={styles.textTopStyle}>
                    This is the Second Page
                </Text>
                <Button
                    title='Go to First Page'
                    onPress={() => 
                        navigation.navigate('FirstPage')}
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

export default SecondPage;
