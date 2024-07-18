import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TransactionList from '../components/TransactionList'
import Transactions from '../components/Transactions'
import { COLORS } from '../theme/theme'

const HomeScreen = () => {
  return (
    <View style={{backgroundColor:COLORS.primaryBlackHex,flex:1}}>     
     <Transactions/>
     <TransactionList/>
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen