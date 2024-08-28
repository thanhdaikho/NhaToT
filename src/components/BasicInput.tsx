import { useRef, useState, useEffect } from "react";
import { Animated, StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather'


const BasicInput = ({ placeHolder, customInputStyle, onPress, onChangeText, error, warn, value, ...props }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(props.secureTextEntry)
    const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current

    useEffect(() => {
        // Handle the change in the 'value' prop
        if (value) {
            animatedLabel(1);
        } else if (isFocused) {
            animatedLabel(1);
        } else {
            animatedLabel(0);
        }
    }, [value, isFocused]);

    const handleFocus = () => {
        setIsFocused(true)
        animatedLabel(1);
    }
    const handleBlur = () => {
        setIsFocused(false)
        if (!value) {
            animatedLabel(0)
        }
    }
    const handleTextChange = (text: any) => {
        if (onChangeText) {
            onChangeText(text);
        }
        if (text) {
            animatedLabel(1);
        } else if (isFocused) {
            animatedLabel(1);
        } else {
            animatedLabel(0);
        }
    };
    const animatedLabel = (toValue: any) => {
        Animated.timing(labelPosition, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const labelStyle = {
        left: 10,
        top: labelPosition.interpolate({
            inputRange: [0, 1.3],
            outputRange: [14, 0],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [17, 13],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ['gray', 'black'],
        })

    };
    return (
        <View style={[styles.innerContainer, error && { borderColor: 'red' } || warn && { borderColor: 'yellow' }, customInputStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>{placeHolder}</Animated.Text>
            <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
                <View style={styles.inputContainer}>
                    <TextInput
                        {...props}
                        style={styles.input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleTextChange}
                        value={value}
                        textAlignVertical="center"
                        editable={false}
                        textContentType={props.secureTextEntry ? 'newPassword' : props.secureTextEntry}
                        secureTextEntry={showPassword}
                    />
                    <Icon name="chevron-down" size={20} color="black" />
                </View>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    innerContainer: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        marginVertical: 10,
        width: '88%',
    },
    label: {
        position: "absolute",
        color: 'gray',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingStart: 5,
    },
    input: {
        flex: 1,
        fontSize: 18,
        marginTop: 9,
        paddingLeft: 10,
        color: 'black',
        paddingStart: 10
    },
    errorText: {
        marginTop: 40,
        fontSize: 15,
        color: 'red',
    },
    warnText: {
        marginTop: 20,
        fontSize: 15,
        color: 'green'
    }
})

export default BasicInput