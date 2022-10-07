import React from 'react';
import { View, Text ,StyleSheet ,FlatList} from 'react-native';
import {colors} from '../utils/colors'
import {fontSizes , spacing} from '../utils/sizes'


export const FocusHistory = ({history}) => {
  if (!history || !history.length) return <View style={styles.container}><Text style={styles.title}>we haven't focused on anything yet!!</Text></View>

  const renderItem = ({item}) => {
    return <Text style={styles.item}>- {item}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we focused on :</Text>
      <FlatList data={history} renderItem={renderItem}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    padding : spacing.md,
    flex : 1
  },
  title : {
    color : colors.white,
    fontSize : fontSizes.lg,
    textAlign : 'center',
  },
  item : {
    fontSize : fontSizes.md,
    color : colors.white,
    fontWeight : 'bold',
    paddingTop : spacing.sm
  }
})