import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName= 'FirstPage'
        screenOptions={{
          //set header color
          headerStyle:{backgroundColor: '#f4511e'},
          //set header text
          headerTintColor: '#FFFF',
          //set header text style
          headerTitleStyle: {fontWeight: ''}
        }}
      >
          <Stack.Screen 
            name= 'FirstPage' 
            component={FirstPage}
            options={{title: 'FIRST PAGE'}}
          />
          <Stack.Screen 
            name= 'SecondPage' 
            component={SecondPage}
            options={{title: 'SECOND PAGE'}}
          />
           <Stack.Screen 
            name= 'ThirdPage' 
            component={ThirdPage}
            options={{title: 'THIRD PAGE'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
