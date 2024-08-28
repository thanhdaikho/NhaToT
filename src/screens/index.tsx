import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OTPVerificationScreen from './OTPVerificationScreen';
import HomeScreen from './HomeScreen';
import auth from '@react-native-firebase/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostManagement from './PostManagement';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import SearchScreen from './SearchScreen';
import PlusButton from '../components/PlusButton';
import EmptyScreen from './EmptyScreen';
import PostNewScreen from './PostNewScreen';
import MainDetail from './MainDetail';
import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';
import FavoriteScreen from './FavoriteScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({ children, onPress, isDisabled }) => (
    <TouchableOpacity onPress={isDisabled ? null : onPress} style={{ marginHorizontal: 35 }} disabled={isDisabled}>
        {children}
    </TouchableOpacity>
);

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarLabel: 'Home',
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 10,
                },
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Icon name='home' size={20} color={focused ? '#20a9f7' : 'gray'} />
                    </View>
                )
            }} />
        <Tab.Screen
            name='Search'
            component={SearchScreen}
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 10,
                },
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Icon name='search' size={20} color={focused ? '#20a9f7' : 'gray'} />
                    </View>
                ),

            }} />
        <Tab.Screen
            name='Empty'
            component={EmptyScreen}
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 10,
                },
                tabBarIcon: ({ focused }) => (
                    <PlusButton />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} isDisabled={true} />
                ),
            }} />
        <Tab.Screen
            name='PostManagement'
            component={PostManagement}
            options={{
                headerShown: true, headerTitleAlign: 'center', headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', headerTitle: 'Quản lý tin đăng',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 10,
                },
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Icon name='file-alt' size={20} color={focused ? '#20a9f7' : 'gray'} />
                    </View>
                )
            }} />

        <Tab.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
                headerShown: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 10,
                },
                title: 'Cài đặt',
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Icon name='user-alt' size={20} color={focused ? '#20a9f7' : 'gray'} />
                    </View>
                )
            }} />
    </Tab.Navigator>
);

const RootComponent = () => {
    const [isLogged, setIsLogged] = useState(false);

    const checkToken = async () => {
        try {
            auth().onAuthStateChanged(user => {
                if (user) {
                    setIsLogged(true)
                } else {
                    setIsLogged(false)
                }
            })
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    const MainRouter = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MainDetailScreen" component={MainDetail} options={{ headerShown: true, headerTitleAlign: 'center', headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', headerTitle: 'Chi Tiết' }} />
                    <Stack.Screen name="PostNewScreen" component={PostNewScreen} options={{ headerShown: true, headerTitleAlign: 'center', headerStyle: { backgroundColor: '#076ae0' }, headerTintColor: '#fff', headerTitle: 'Đăng Tin' }} />
                    <Stack.Screen name="OTPScreen" component={OTPVerificationScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: true, title: 'Yêu thích' }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };

    const AuthRouter = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="OTPScreen" component={OTPVerificationScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="PostNewScreen" component={PostNewScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: true, title: 'Yêu thích' }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };

    return isLogged ? <MainRouter /> : <AuthRouter />;
};

export default RootComponent;

const styles = StyleSheet.create({});
