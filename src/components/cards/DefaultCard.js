import * as React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';

const DefaultCard = ({title, content, imgSource} = props) => (
  <Card>
    <Card.Cover source={{uri: imgSource}} />
    <Card.Content>
      <DefaultText text={title} fontWeight={600} fontSize={20} />
      <DefaultText text={content} />
    </Card.Content>
  </Card>
);

export default DefaultCard;
