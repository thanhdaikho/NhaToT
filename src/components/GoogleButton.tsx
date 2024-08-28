import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const GoogleButton = () => {
    return(
        <View style={styles.container}>
            <Image style={{width: 27, height: 27, marginHorizontal: 4}} source={require('../assets/imgs/google_logo.png')}/>
            <Text>Đăng nhập cùng Google</Text>
        </View>
    )
}

export default GoogleButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 47,
        borderWidth: 1,
        borderColor: '#076ae0',
        borderRadius: 7,
        marginTop: 15
    }
})
