import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const SearchBar = ( {searchStyle} ) => {
    return (
        <View style={[styles.container, searchStyle]}>
              <Icon name='search' size={20} color='gray' style={{position: 'absolute', left: 15}}/>
              <TextInput placeholder='Tìm kiếm trên Nhà Tốt' style={{width: '80%' , height: 40, marginStart: 10}}/>
        </View>
      )
}

export default SearchBar
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        width: '80%'
    }
})
