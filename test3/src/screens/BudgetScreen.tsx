import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Budgets from '../components/Budgets'
import BudgetSummary from '../components/BudgetSummary'
import { COLORS } from '../theme/theme'

const BudgetScreen = () => {
  return (
   
   <View style={{backgroundColor:COLORS.primaryBlackHex,flex:1}}>
    <Budgets/>
    <BudgetSummary/>
   </View>
  )
}

const styles = StyleSheet.create({})

export default BudgetScreen