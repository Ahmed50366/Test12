import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExerciseApi from '../components/ExerciseApi'
import { COLORS } from '../theme/theme'

const ExerciseScreen = () => {
  return (
    <View style={{backgroundColor:COLORS.primaryBlackHex,flex:1}}>
      <ExerciseApi/>

      </View>
    )
}

export default ExerciseScreen

const styles = StyleSheet.create({})