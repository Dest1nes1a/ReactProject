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

const validateSchema = Yup.object().shape({
  name: Yup.string().required('กรุณาป้อนชื่อ-สกุล'),
  email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีกเมลใหม่'),
  password: Yup.string().min(4, 'รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป').required('กรุณาป้อนรหัสผ่าน'),
});

const RegisterScreen = ({navigation}) => {
  return (
    <Container>
      <Content padder>
        <Formik
        //กำหนดค่าเริ่มต้นของข้อมูล โดยกำหนดให้ตรงกับข้อมูลใน backend
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={validateSchema}
          //เมื่อคลิกที่ปุ่ม Register ให้ทำงานส่วนนี้
          onSubmit={async (values, {setSubmitting}) => {
            // same shape as initial values
            //alert(JSON.stringify(values))
            try {
              const url = 'https://api.codingthailand.com/api/register'
              const res = await axios.post(url,{
                name : values.name, 
                email : values.email, 
                password : values.password
              })
              alert(res.data.message)
              //กลับไปหน้า HOME
              navigation.navigate('HomeScreen');
            } catch (error) { //ถ้าไม่สามารถบันทึกข้อมูลลง server ได้
              alert(error.response.data.errors.email[0])
            } finally{// ทำให้ปุ่มสามารถกดได้อีก
              setSubmitting = false
            }

          }}>
            {/* errors ใช้สำหรับการตรวจสอบ error ที่เกิดขึ้น/state of error เป็นอะไร */}
            {/* touched เมื่อผู้ใช้ไปกดที่ Name และเลื่อนเมาส์ออกไปด้านนอกช่อง Input โดยไม่กรอกข้อมูล */}
          {({errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting}) => (  //handleSubmit click button แล้วทำงานอะไร | isSubmitting ถ้ากำลัง submit อยู่จะไม่ให้ปุ่ม submit ทำงานให้เสร็จก่อน แล้ว button จะขึ้นมาให้กดใหม่
            <Form>
              {/* กำหนดให้มีเส้นสีแดงถ้าผู้ใช้ไม่กรอกข้อมูลในช่อง Input */}
              <Item fixedLabel error={errors.name && touched.name?true:false}>
                <Label>Name</Label>
                <Input 
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')} //อารมณ์เก็บ state ก่อนที่จะออกจากช่อง input
                />
                {errors.name && touched.name && <Icon name='close-circle'/>}
              </Item>
              {errors.name && touched.name && (
                  <Item>
                    <Label style={{color:'red'}}>{errors.name}</Label>
                  </Item>
                )}
              <Item fixedLabel error={errors.email && touched.email?true:false} >
                <Label>Email</Label>
                <Input 
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType='email-address'
                />
                {errors.email && touched.email && <Icon name='close-circle'/>}
              </Item>
              {errors.email && touched.email && (
                  <Item>
                    <Label style={{color:'red'}}>{errors.email}</Label>
                  </Item>
                )}
              <Item fixedLabel error={errors.password && touched.password?true:false}>
                <Label>Password</Label>
                <Input 
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  keyboardType='number-pad'
                  secureTextEntry={true}
                />
                {errors.password && touched.password && <Icon name='close-circle'/>}
              </Item>
              {errors.password && touched.password && (
                  <Item>
                    <Label style={{color:'red'}}>{errors.password}</Label>
                  </Item>
                )}
              
              <Button
                onPress={handleSubmit}
                //เอาไว้สำหรับ เปิด/ปิดปุ่มการทำงาน
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
                  REGISTER
                </Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
