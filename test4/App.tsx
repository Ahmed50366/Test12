import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import TabNavigator from './src/navigators/TabNavigator'
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      

      <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
    
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App