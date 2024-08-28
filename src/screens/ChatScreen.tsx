import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'

const ChatScreen = ({ navigation }) => {
    const currentUserId = auth().currentUser.uid; // Thay bằng cách lấy userId của người dùng đang đăng nhập

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersRef = firebase
            .app()
            .database('https://nhatot-dfad9-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/chats');

        const handleData = (snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const usersArray = Object.keys(usersData).filter(userIds => userIds.includes(currentUserId) && userIds !== currentUserId);
                setUsers(usersArray);
            }
        };

        usersRef.on('value', handleData);

        return () => {
            usersRef.off('value', handleData);
        };
    }, [currentUserId]);

    const navigateToMessages = (userId) => {
        navigation.navigate('MessageScreen', { userId });
    };

    const renderUser = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToMessages(item)}>
            <View style={styles.userItem}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ChatScreen;
