import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from 'native-base';
import React, {Component} from 'react';
import axios from 'axios';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStoreContext } from '../context/UserContext';


const LoginScreen = ({navigation}) => {
  
  const userStore = React.useContext(userStoreContext);
 
  return (
    <Container>
    <Content padder>
      <Formik
      initialValues={{
        email: '',
        password: '',
      }}
        onSubmit={async (values, {setSubmitting}) => {
          try {
            const url = 'https://api.codingthailand.com/api/login'
            const res = await axios.post(url,{
                email : values.email, 
                password : values.password
              })
            //alert(JSON.stringify(res.data))
            //เก็บข้อมูล/Token ลงเครื่อง
            await AsyncStorage.setItem('@token', JSON.stringify(res.data))
            //Get Profile 
            const urlProfile = 'https://api.codingthailand.com/api/profile';
            const resProfile = await axios.get(urlProfile, {
              headers:{
                Authorization : 'Bearer ' + res.data.access_token
              }
            });
            //alert(JSON.stringify(resProfile.data.data.user))
            //เก็บข้อมูล Profile ลง AsyncStorage
            await AsyncStorage.setItem('@profile', JSON.stringify(resProfile.data.data.user))
            
            //get & update Profile by Context/Global state
            const profile = await AsyncStorage.getItem('@profile')
            userStore.updateProfile(JSON.parse(profile))
            
            alert('เข้าสู่ระบบเรียบร้อยแล้ว')
            navigation.navigate('HomeScreen')
        } catch (error) { 
            alert(error.response.data.message)
          } finally{
            setSubmitting = false
          }

        }}>
        {({errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting}) => ( 
          <Form>
            <Item fixedLabel error={errors.email && touched.email?true:false}>
              <Label>Email</Label>
              <Input 
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
              />
            </Item>

            <Item fixedLabel error={errors.password && touched.password?true:false}>
              <Label>Password</Label>
              <Input 
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                keyboardType='number-pad'
                secureTextEntry={true}
              />
            </Item>

            <Button
              onPress={handleSubmit}
              disabled = {isSubmitting}
              block
              large
              style={{marginTop: 30, backgroundColor: '#f4511e'}}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                LOGIN
              </Text>
            </Button>
          </Form>
        )}
      </Formik>
    </Content>
  </Container>
  )
}

export default LoginScreen