import React, { useEffect, useState } from 'react';
import { View, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');

                if (userToken) {
                    // User is logged in, navigate to HomeScreen
                    navigation.replace('Main');
                } else {
                    // User is not logged in, navigate to AuthScreen
                    navigation.replace('LoginScreen');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        };
        checkToken();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#076ae0', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor='#076ae0' translucent />
            <Image style={{ width: '70%', height: '70%' }} resizeMode='contain' source={require('../assets/imgs/logo.png')} />
        </View>
    );
};

export default SplashScreen;
