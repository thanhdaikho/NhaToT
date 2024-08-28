import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native'
import PhoneInput from '../components/PhoneInputAndCountryPicker'
import CheckBox from '../components/CheckBox'
import ButtonLarge from '../components/ButtonLarge'
import GoogleButton from '../components/GoogleButton'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignupScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isChecked, setIsChecked] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
        console.log(isChecked)
    }
    const handleSignup = () => {
        setIsLoading(true)
        setEmailError("");
        setNameError("");
        setPhoneError("");
        if (isChecked) {
            checkValid()
        } else {
            Alert.alert('Thông báo', 'Vui lòng đọc kỹ điều khoản của ứng dụng và xác nhận.')
        }
    }
    const checkValid = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setEmailError("Vui lòng kiểm tra email của bạn");
            setIsLoading(false)
            setIsValid(false)

            // return;
        }
        if (name.trim() == '') {
            setNameError("Vui lòng nhập tên của bạn")
            setIsLoading(false)
            setIsValid(false)

            // return;
        }
        if (phoneNumber.length < 6) {
            setPhoneError("Vui lòng nhập số điện thoại của bạn")
            setIsLoading(false)
            setIsValid(false)

            // return;
        }

        if (phoneNumber.length < 6 || !emailRegex.test(email) || name.trim() == '') {
            return
        } else {
            try {
                const userSnapshot = await firestore()
                    .collection('Users')
                    .where('phoneNumber', '==', phoneNumber)
                    .get();
                    if (userSnapshot.empty) {
                        signInWithPhoneNumber()
        
                    } else {
                        setPhoneError('Số điện thoại đã tồn tại')
                    }
            } catch (error) {
                console.error('Error uploading to Firestore:', error);
            }
        }




    }

    const signInWithPhoneNumber = async () => {
        try {
            navigation.navigate('OTPScreen', { phoneNumber, name, email })
        } catch (e) {
            console.log('Lỗi khi gửi code: SignupScreen, ln:84: ' + e)
        }
        setIsLoading(false)

    }

    return (
        //Main container
        <ScrollView>
            <View style={styles.container}>
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={{ fontSize: 17 }}>Chào mừng bạn đến với Nhà Tốt</Text>
                    <Text style={{ marginTop: 5, marginBottom: 10, color: 'black', fontSize: 50, fontFamily: 'DMSerifDisplay-Regular' }}>Register</Text>
                </View>
                {/* Body */}
                <View style={styles.bodyContainer}>

                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 800 }}>Email</Text>
                    <TextInput
                        style={{
                            width: '100%',
                            height: 45,
                            borderWidth: 1,
                            borderColor: emailError ? 'red' : 'gray', // Sử dụng màu đỏ nếu có lỗi, ngược lại sử dụng màu gray
                            marginTop: 10,
                            borderRadius: 7,
                            padding: 12,
                        }}
                        placeholder='nguyenvana@gmail.com'
                        value={email}
                        onChangeText={(text) => { setEmail(text) }}
                    />
                    {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 800, marginTop: 15 }}>Tên người dùng</Text>
                    <TextInput
                        style={{
                            width: '100%',
                            height: 45,
                            borderWidth: 1,
                            borderColor: nameError ? 'red' : 'gray',
                            marginTop: 10,
                            borderRadius: 7,
                            padding: 12
                        }}
                        placeholder='Nguyen Van A'
                        value={name}
                        onChangeText={(text) => { setName(text) }}
                    />
                    {nameError && <Text style={styles.errorText}>{nameError}</Text>}

                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 800, marginTop: 15, marginBottom: 10 }}>Số điện thoại</Text>
                    <PhoneInput value={phoneNumber} onChangeText={(text) => { setPhoneNumber(text) }} error={phoneError} inputStyle={undefined} />
                    {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                    <CheckBox onPress={handleCheckbox} />

                </View>
                {/* Footer */}
                <View style={styles.footerContainer}>
                    <ButtonLarge onPress={handleSignup} title={"Đăng Ký"} buttonStyle={styles.buttonStyle} isLoading={isLoading} />
                    <Text style={{ alignSelf: 'center', marginTop: 15 }}>Hoặc</Text>
                    <GoogleButton />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 70 }}>
                        <Text style={{ color: 'black' }}>Đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen')}}>
                            <Text style={{ fontWeight: 800 }}> Đăng nhập tại đây</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25
    },
    headerContainer: {
        marginTop: 45,
    },
    bodyContainer: {
        marginTop: 25
    },
    footerContainer: {
        marginTop: 25
    },
    buttonStyle: {
        width: "100%",
        height: 47,
        borderRadius: 7,
    },
    errorText: {
        marginTop: 4,
        color: 'red',
        marginBottom: -10,
        fontStyle: 'italic'
    }
})
