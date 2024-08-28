import React, { useState, useRef } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

const InputBoxOTP = ({onOtpChange }) => {
  const inputRefs = Array(6).fill(0).map((_, index) => useRef(null));
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange(newOtp.join(''));
    // Move to the next input
    if (index < 5 && text !== '') {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={[styles.input, index > 0 && { marginLeft: 5 }]} // Add marginLeft for all inputs except the first one
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 5,
    textAlign: 'center',
    marginTop: 35,
    justifyContent: 'space-evenly',
    backgroundColor: 'white'

  },
});

export default InputBoxOTP;
