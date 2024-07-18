import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Provider } from 'react-redux'
import { store } from './src/store/store'
import MovieApi from './src/components/MovieApi'


const App = () => {
  return (
    <Provider store={store}>
      <MovieApi/>
    
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App