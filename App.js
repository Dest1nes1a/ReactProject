import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image } from 'react-native';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=>{
  //define Structure for navigation Drawer
  const toggleDrawer = () =>{
    props.navigationProps.toggleDrawer();
  }

  return(
    <View style = {{flexDirection: 'row'}}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        <Image 
          source={require('C:/reactProject/asset/drawerWhite.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
       />
      </TouchableOpacity>

    </View>
  )
}


function FirstScreenStack({navigation}){
  return(
    <Stack.Navigator
      initialRouteName= 'FirstPage'
      screenOptions={{
        headerStyle:{backgroundColor: '#f4511e'}, 
        headerTintColor: '#FFFF', 
        headerTitleStyle: {fontWeight: 'bold'}, 
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation}/>
    }}
    >
      <Stack.Screen 
        name= 'FirstPage' 
        component={FirstPage}
        options={{title: 'FIRST PAGE'}}
      />
    </Stack.Navigator>
  );
}

function SecondScreenStack({navigation}){
  return(
    <Stack.Navigator
      initialRouteName= 'FirstPage'
      screenOptions={{
        headerStyle:{backgroundColor: '#f4511e'}, 
        headerTintColor: '#FFFF', 
        headerTitleStyle: {fontWeight: ''},
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation}/>
      }}
    >
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
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='FirstPage' component ={FirstScreenStack}/>
        <Drawer.Screen name='SecondPage' component ={SecondScreenStack}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
