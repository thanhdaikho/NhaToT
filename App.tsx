import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, StatusBar } from 'react-native'
import RootComponent from './src/screens'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootComponent />
    </GestureHandlerRootView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})



