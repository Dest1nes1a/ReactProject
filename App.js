import {View, Text, Image} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import SettingScreen from './screens/SettingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();


function SettingScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#FFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{title: 'SETTING SCREEN'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'PROFILE SCREEN'}}
      />
    </Stack.Navigator>
  );
}

function HomeScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#FFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'HOME SCREEN'}}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused 
              ? <Image source={require('./asset/logo1.png')} style={{width: 25, height: 25, marginLeft: 5}}/> 
              : <Image source={require('./asset/logo2.png')} style={{width: 25, height: 25, marginLeft: 5}}/>;
            } else if (route.name === 'SettingScreen') {
              iconName = focused 
              ? <Image source={require('./asset/logo1.png')} style={{width: 25, height: 25, marginLeft: 5}}/> 
              : <Image source={require('./asset/logo3.png')} style={{width: 25, height: 25, marginLeft: 5}}/>;
            }
            return iconName;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ffa500',
          inactiveTintColor: '#5743bb',
          tabBarVisible: true
        }}>
        <Tab.Screen name="HomeScreen" component={HomeScreenStack}/>
        <Tab.Screen name="SettingScreen" component={SettingScreenStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
