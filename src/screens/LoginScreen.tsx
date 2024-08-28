import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, StatusBar, ScrollView, useWindowDimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import PhoneInput from '../components/PhoneInputAndCountryPicker'
import ButtonLarge from '../components/ButtonLarge'
import GoogleButton from '../components/GoogleButton'
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({ navigation }) => {
    const { height } = useWindowDimensions()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSignin = async () => {
        setIsLoading(true);
        if (phoneNumber.length < 1) {
            setPhoneNumberError('Vui Lòng nhập số điện thoại')
            setIsLoading(false)
            return
        }
        try {
            // Check if the user with the provided phone number exists
            const userSnapshot = await firestore()
                .collection('Users')
                .where('phoneNumber', '==', phoneNumber)
                .get();

            if (userSnapshot.empty) {
                setPhoneNumberError('Số điện thoại chưa được đăng ký');
                return;
            } else {
                // User already exists, navigate to HomeScreen
                await signInWithPhoneNumber();
            }
        } catch (error) {
            console.error('Error uploading to Firestore:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const signInWithPhoneNumber = async () => {
        try {
            await navigation.navigate('OTPScreen', { phoneNumber });
        } catch (error) {
            console.error('Error navigating to OTPScreen:', error);
        }
    };
    return (
        //Main Container
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor={"#076ae0"} />
                    {/* Header View */}
                    <View style={styles.headerContainer}>
                        <View style={{ width: '100%', height: height / 3, backgroundColor: '#076ae0', flex: 3 }}>
                        </View>

                    </View>
                    {/* Body View */}
                    <View style={styles.bodyContainer}>
                        <Text style={{ marginTop: 20, fontSize: 18, color: 'gray' }}>Chào mừng bạn đến với Nhà Tốt</Text>
                        <Text style={{ marginTop: 5, marginBottom: 10, color: 'black', fontSize: 50, fontFamily: 'DMSerifDisplay-Regular' }}>Sign In</Text>
                        <Text style={{ marginTop: 10, color: 'black', fontSize: 16 }}>Số điện thoại</Text>
                        <PhoneInput value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} inputStyle={styles.input} error={phoneNumberError} />
                        {phoneNumberError && (<Text style={styles.errorText}>{phoneNumberError}</Text>)}
                        <ButtonLarge onPress={handleSignin} title={'Đăng Nhập'} buttonStyle={styles.buttonStyle} isLoading={isLoading} />
                        <Text style={{ alignSelf: 'center' }}>Hoặc</Text>
                        <GoogleButton />
                    </View>
                    {/* Footer View */}
                    <View style={styles.footerContainer}>
                        <Text style={{ color: 'black' }}>Chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen') }}>
                            <Text style={{ fontWeight: 800 }}> Đăng ký tại đây</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    bodyContainer: {
        marginStart: 25,
        marginEnd: 25
    },
    input: {
        width: '100%',
        marginTop: 5
    },
    buttonStyle: {
        width: "100%",
        height: 47,
        borderRadius: 7,
        marginVertical: 15
    },
    footerContainer: {
        marginTop: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    errorText: {
        marginTop: 4,
        color: 'red',
        marginBottom: -10,
        fontStyle: 'italic'
    }
})
