import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput, Button, FlatList } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database'

const MessageScreen = ({ route, navigation }) => {
    const { item, userPostingData, userIdFromPost } = route.params
    const [message, setMessage] = useState('')
    const currentUserId = auth().currentUser.uid
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const chatId = userIdFromPost < currentUserId
            ? `${userIdFromPost}_${currentUserId}`
            : `${currentUserId}_${userIdFromPost}`;

        const messagesRef = firebase
            .app()
            .database('https://nhatot-dfad9-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/chats/${chatId}/messages`);

        // Lắng nghe sự kiện khi có thay đổi trong dữ liệu của node messages
        messagesRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const messagesData = snapshot.val();
                const messagesArray = Object.values(messagesData);
                setMessages(messagesArray);
            }
        });

        // Clean up sự kiện khi component bị unmounted
        return () => {
            messagesRef.off();
        };
    }, [userIdFromPost, currentUserId]);


    const convertCurrency = (value) => {
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + ' tỷ';
        } else if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + ' triệu';
        } else {
            return value.toString();
        }
    };
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            try {
                const chatId = userIdFromPost < currentUserId
                    ? `${userIdFromPost}_${currentUserId}`
                    : `${currentUserId}_${userIdFromPost}`;
                const newMessageRef = firebase
                    .app()
                    .database('https://nhatot-dfad9-default-rtdb.asia-southeast1.firebasedatabase.app/')
                    .ref(`/chats/${chatId}/messages`).push();
                newMessageRef.set({
                    content: message,
                    senderId: currentUserId,
                    timestamp: new Date().getTime(),
                }, (error) => {
                    if (error) {
                        console.error("Lỗi khi tải tin nhắn lên Firebase:", error);
                    } else {
                        console.log("Tin nhắn đã được tải lên Firebase thành công.");
                        // Xóa nội dung tin nhắn sau khi gửi

                    }
                });
                setMessage('');
            } catch (e) {
                console.log(e)
            }

        }
    }
    const renderMessage = ({ item }) => {
        const isSender = item.senderId === currentUserId;

        return (
            <View style={{ padding: 10, alignSelf: isSender ? 'flex-end' : 'flex-start' }}>
                <View style={{ backgroundColor: isSender ? '#6DB3F2' : '#EDEDED', padding: 10, borderRadius: 8 }}>
                    <Text>{item.content}</Text>
                </View>
                <Text>Đã gửi {new Date(item.timestamp).toLocaleString()}</Text>
            </View>
        );
    };


    return (
        <View style={styles.mainContainer}>
            <View style={[styles.header, styles.rowStyle]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <FeatherIcon name='arrow-left' size={26} />
                </TouchableOpacity>
                <Image source={require('../assets/imgs/default_user.png')} style={{ width: 35, height: 35, marginStart: 7, marginEnd: 10 }} />
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff' }}>{userPostingData.name}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 15 }}>
                    <FeatherIcon name='info' size={28} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.timestamp.toString()}
            />
            <View style={[styles.rowStyle, { position: 'absolute', bottom: 0, height: 50, width: '100%' }]}>
                <TextInput value={message} onChangeText={(text) => { setMessage(text) }} placeholder='Nhập tin nhắn' style={{ width: '90%', backgroundColor: 'gray' }} />
                <Button title='Gửi' onPress={handleSendMessage} />
            </View>
        </View>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#076ae0',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    rowStyle: {
        flexDirection: 'row'
    }
})
