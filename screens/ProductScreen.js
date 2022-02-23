import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import axios from 'axios';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Badge,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native'
import DetailScreen from './DetailScreen';

const IoniconsHeaderButton = props => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const ProductScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="register"
            iconName="person-add"
            onPress={() => alert("ลงทะเบียน")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  //DEFINE VALUE
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  //useEffect ทำงานเมื่อคลิกที่เมนูสินค้า [เรียกครั้งเดียว เวลาคลิก]
  //useEffect(() => {getData();}, []);

  //ทุก ๆ ครั้งที่เข้าหน้า Product/Focus ที่หน้า Product เราจะให้ไปดึงของมูลที่ server ตลอดเวลา
  useFocusEffect(
    //useCallback เอาไว้ Optimize function เพื่อไม่ให้ re-render ของ child component
    React.useCallback(()=>{
      cancelToken = axios.CancelToken.source();
      getData();
      
      return()=>{
       cancelToken.cancel();
      }
    },[])
  ); 

  let cancelToken;
  //getData() for get data from backend
  const getData = async () => {
    setLoading(true); //ก่อนโหลดข้อมูล set เป็น True
    const res = await axios.get('https://api.codingthailand.com/api/course',{
      cancelToken : cancelToken.token
    });
    //alert(JSON.stringify(res.data.data)); //JSON.stringify แปลง JS --> JSON
    setProduct(res.data.data); //Update Product จากค่าที่ดึงมา
    setLoading(false); //พอโหลดข้อมูลเรียบร้อยเป็น set เป็น False
  };


  if(loading === true){
    return(
      <View style={styles.container}>
        <ActivityIndicator color = '#f4511e' size = 'large'/>

      </View>
    )
  }

  const _onRefresh = ()=> {getData();}

  return (
    <View>
      <FlatList
        //DATA ใช้ loop แสดง data ใน backend
        data={product}
        //keyExtractor คีย์หลัก (อารมณ์ PK)
        keyExtractor={item => item.id.toString()} //keyExtractor = {(item, index)=> item.id.toString()}
       //pull on refresh
       onRefresh={_onRefresh}
       refreshing={loading} //ถ้า refreshing = true จะรอให้ refresh data จนจบ
        //renderItem สำหรับ render หน้า UI ที่จะให้ User มองเห็น
        renderItem={({item}) => (
          <ListItem 
            thumbnail 
            onPress={()=>{
              navigation.navigate('DetailScreen', {
                id:item.id,
                title:item.title //นำค่า Title จาก backend ส่งให้ตัวแปล title เพื่อนำไปใช้ใน Detail Screen
              })
            }}
          >
            <Left>
              <Thumbnail square source={{uri: item.picture}} />
            </Left>
            <Body>
              <Text>{item.title}</Text>
              <Text note numberOfLines={1}>
                {item.detail}
              </Text>
            </Body>
            <Right>
              <Badge danger>
                <Text>{item.view}</Text>
              </Badge>
            </Right>
          </ListItem>
        )}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//useEffect เหมาะกับดึงข้อมูล 1 รอบเท่านั้น 
//useFocusEffect สำหรับดึงข้อมูลบ่อย ๆ  เช่น ไปหน้านี้แล้วต้องการดึง data มาอัพเดท แต่มีข้อเสียเรื่อง bandwidth