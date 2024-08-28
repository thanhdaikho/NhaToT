import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Spacing = ({ height, color }) => {
    return (
        <View style={{ width: '100%', height: height, backgroundColor: color }} />
    )
}

export default Spacing

const styles = StyleSheet.create({})
