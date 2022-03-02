import {View, ScrollView} from 'react-native';
import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userStoreContext} from '../context/UserContext';

const MenuScreen = ({navigation}) => {
  // const [profile, setProfile] = React.useState(null);
  const userStore = React.useContext(userStoreContext);

  React.useEffect(() => {
    const getProfile = async () => {
      const profile = await AsyncStorage.getItem('@profile');
      if (profile) {
        userStore.updateProfile(JSON.parse(profile));
        //setProfile(JSON.parse(profile));
      }
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: undefined,
          height: 150,
        }}>
        <Text
          style={{
            color: '#f4511e',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 20,
          }}>
          เมนูหลัก
        </Text>
        {/* แสดงข้อมูล Profile ที่เมนูด้านข้างต่อจากเมนูหลัก */}
        {userStore.profile && (
          <>
            <Text style={{fontSize: 18, color: '#f4511e', fontWeight: 'bold'}}>
              ยินดีต้อนรับคุณ {userStore.profile.name}
            </Text>
            <Text style={{fontSize: 14, color: '#f4511e', fontWeight: 'bold'}}>
              Welcome {userStore.profile.email}
            </Text>
          </>
        )}
      </View>

      <View>
        {/* CODE FROM NATIVE BASE */}
        <Content>
          <ListItem icon onPress={() => navigation.navigate('HomeStack')}>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>หน้าหลัก</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon onPress={() => navigation.navigate('ProductStack')}>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="cart" />
              </Button>
            </Left>
            <Body>
              <Text>สินค้า</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          {!userStore.profile && (
            <ListItem icon onPress={() => navigation.navigate('LoginScreen')}>
              <Left>
                <Button style={{backgroundColor: '#007AFF'}}>
                  <Icon active name="log-in" />
                </Button>
              </Left>
              <Body>
                <Text>เข้าสู่ระบบ</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          )}

          {userStore.profile && (
            <ListItem icon 
              onPress={ async()=>{
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@profile');
                userStore.updateProfile(null);
                navigation.closeDrawer();
            }}>
              <Left>
                <Button style={{backgroundColor: '#bb4a54'}}>
                  <Icon active name="log-out" />
                </Button>
              </Left>
              <Body>
                <Text>ออกจากระบบ</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          )}
        </Content>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;
