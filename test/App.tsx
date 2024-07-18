import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Tasks from './src/components/Tasks'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

const App = () => {
  return (
    <Provider store={store}>
    <Tasks/>
    
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App