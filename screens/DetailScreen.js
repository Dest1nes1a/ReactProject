import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
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

const DetailScreen = ({navigation, route}) => {
  const {id, title} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation]); // [navigation] ใส่เพื่อบอกว่า จะทำงานเมื่อมีการ navigation มาจากหน้าอื่น

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async id => {
    setLoading(true);
    const res = await axios.get(
      'https://api.codingthailand.com/api/course/' + id,
    );
    setDetail(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, [id]);
  const _onRefresh = () => {
    getData(id);
  };

  return (
    <View>
      <FlatList
        data={detail}
        keyExtractor={(item, index) => item.ch_id.toString()}
        onRefresh={_onRefresh}
        refreshing={loading}
        renderItem={({item, index}) => (
          <ListItem thumbnail>
           <Left>
             <Text>{index+1}</Text>
            </Left>
            <Body>
              <Text>{item.ch_title}</Text>
            </Body>
            <Right>
              <Badge danger>
                <Text>{item.ch_view}</Text>
              </Badge>
            </Right>
          </ListItem>
        )}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
