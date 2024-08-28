import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'

const ButtonLarge = ({ onPress, title, buttonStyle, isLoading, ...props }) => {
    return (
        // <TouchableOpacity style={[{
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundColor: '#076ae0',
        // }, buttonStyle]}
        //     onPress={onPress}
        // >
        //     {isLoading ? (<ActivityIndicator color='#fff' />) :
        //         (<Text style={{ fontSize: 17, color: 'white' }}>{title}</Text>)}
        // </TouchableOpacity >
        <TouchableOpacity
            style={[{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#076ae0',
            }, buttonStyle]}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color='#fff' />
            ) : (
                <Text style={{ fontSize: 17, color: 'white' }}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}
export default ButtonLarge
const styles = StyleSheet.create({
    container: {

    }
})
