import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native';
import PostNewScreen from '../screens/PostNewScreen';

const PlusButton = () => {
    const navigation = useNavigation();

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [open, setOpen] = useState(false);


    const handleSellScreen = () => {
        navigation.navigate(PostNewScreen)
    }

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();
        setOpen(!open);
    };
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "135deg"]
                }),


            }
        ]
    }
    const pinStyle = {
        transform: [
            {
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, -10]
                }),

            }
        ]
    }

    return (
        <View style={{ position: 'absolute', alignItems: 'center' }}>
            <TouchableOpacity>
                <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
                    <Icon name='credit-card' color='#fff' size={20} />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSellScreen}>
                <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
                    <Icon name='sack-dollar' color='#fff' size={20} />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMenu} style={styles.button}>
                < Animated.View style={[rotation]}>
                    <Icon name='plus' color='#fff' size={35} />
                </Animated.View>
            </TouchableOpacity>

        </View >
    )
}

export default PlusButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 30, width: 60, height: 60, backgroundColor: '#20a9f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 180,
    },
    secondary: {
        width: 48,
        height: 48,
        alignSelf: 'center',
        marginBottom: 10
    },
    header: {
        flex: 1,
        width: '100%',
    }
})
