import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const CheckBox = ({ onPress }) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
        onPress(!isChecked)
    };

    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={handleCheckboxToggle}
            >
                {isChecked ? (
                    // <Text style={styles.checkedText}>X</Text>
                    <Icon name='check' />

                ) : (
                    <Text style={styles.uncheckedText}>◯</Text>
                )}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Bằng cách đăng ký, bạn đồng ý với</Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: 800, color: 'black' }}> chính sách sử dụng. </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkedText: {
        color: 'black',
        fontSize: 18,
    },
    uncheckedText: {
        color: 'transparent',
        fontSize: 18,
    },
    label: {
        fontSize: 15,
    },
});

export default CheckBox;
