import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import InputBoxOTP from '../components/InputBoxOTP';
import FloatingButton from '../components/FloatingButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerificationScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const { phoneNumber, name, email } = route.params;
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    const handleOtpChange = (otp) => {
        setCode(otp)
    }

    useEffect(() => {
        const fetchConfirmation = async () => {
            try {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                setConfirm(confirmation);
            } catch (error) {
                console.log('Lỗi khi tạo đối tượng xác minh:', error);
            }
        };
        fetchConfirmation();
    }, [phoneNumber]);

    useEffect(() => {
        if (confirm !== null) {
            setIsReady(true);
        }
    }, [confirm]);

    const confirmCode = async () => {
        setIsLoading(true);
        try {
            // Xác nhận mã OTP
            await confirm.confirm(code);
            console.log('Xác nhận thành công');
            uploadToFirestore()
        } catch (error) {
            console.log('Lỗi xác nhận mã OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const uploadToFirestore = async () => {
        try {
            // Check if the user with the provided phone number exists
            const userSnapshot = await firestore()
                .collection('Users')
                .where('phoneNumber', '==', phoneNumber)
                .get();

            if (userSnapshot.empty) {
                // User does not exist, proceed to add the user to Firestore
                await firestore()
                    .collection('Users')
                    .add({
                        id: auth().currentUser?.uid,
                        email: email,
                        name: name,
                        phoneNumber: phoneNumber,
                    });
                console.log('User added!');

                createToken()

            } else {
                // User already exists, navigate to HomeScreen
                console.log('User already exists!');

                createToken()

            }
        } catch (error) {
            console.error('Error uploading to Firestore:', error);
        }
    };

    const createToken = async() => {
        try {
            // Your authentication logic...

            // Get the user's ID token
            const userToken = await auth().currentUser?.getIdToken();

            // Save the ID token to AsyncStorage
            await AsyncStorage.setItem('userToken', userToken);

            // Navigate to HomeScreen
            navigation.replace('Main');

            setIsLoading(false)
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#076ae0' }}>
            <View style={styles.headerContainer}>
                <Image style={{ width: 200, height: 200 }} source={require('../assets/imgs/logo.png')} />
            </View>
            <View style={styles.bodyContainer}>
                <Text style={{ color: '#b6cf5f', fontSize: 17 }}>Mã OTP đã được gửi tới số điện thoại: </Text>
                <Text style={{ color: '#fff', marginVertical: 15, fontSize: 15 }}>{phoneNumber}</Text>
                <InputBoxOTP onOtpChange={handleOtpChange} />
            </View>

            <View style={styles.footerContainer}>
                {isReady ? (<FloatingButton onPress={confirmCode} isLoading={isLoading} />) : null}
            </View>
        </View>
    );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
    headerContainer: {},
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 30,
        flex: 2,
        right: 30,
    },
});
