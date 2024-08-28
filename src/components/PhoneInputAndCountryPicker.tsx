import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'
import Icon from 'react-native-vector-icons/Feather'


const PhoneInput = ({ value, onChangeText, error, inputStyle, ...props }) => {
    const [countryCode, setCountryCode] = useState('+84');
    const [countryFlag, setCountryFlag] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [show, setShow] = useState(false);
    const handleTextChange = (text) => {
        setPhoneNumber(text)
        onChangeText(countryCode + text)
    }
    return (
        <View style={[styles.container, {borderColor: error ? 'red' : 'gray'}, inputStyle]}>
            <TouchableOpacity style={styles.pickerContainer} onPress={() => { setShow(!show) }}>
                <CountryPicker
                    show={show}
                    lang={'en'}
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                    onBackdropPress={() => setShow(false)}
                    onRequestClose={() => setShow(false)}
                />
                <Text>{countryCode}</Text>
                <Icon name="chevron-down" size={15} style={{ marginStart: 4 }} />
            </TouchableOpacity>
            <TextInput
                placeholder='Ex: 332 536 150'
                value={phoneNumber}
                onChangeText={(text) => handleTextChange(text)}
                style={{ fontSize: 15, color: 'black', width: '100%' }}
                keyboardType={'number-pad'} />
        </View>
    )
}

export default PhoneInput
const styles = StyleSheet.create({
    container: {
        height: 47,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center'
    },
    pickerContainer: {
        width: 60,
        height: 50,

        borderRightColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
}) 