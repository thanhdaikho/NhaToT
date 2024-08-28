import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const FloatingButton = ( {onPress, isLoading} ) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={isLoading}>
            {isLoading ? (<ActivityIndicator/>) : <Icon name='chevron-right' size={25} color={'#076ae0'}/>}
            
        </TouchableOpacity>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})
