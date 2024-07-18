import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Exercise from '../components/Exercise';
import ExerciseList from '../components/ExerciseList';
import { COLORS } from '../theme/theme';

const HomeScreen = () => {
  return (
    <View style={{backgroundColor:COLORS.primaryBlackHex,flex:1}}>
      <Exercise />
      <ExerciseList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
