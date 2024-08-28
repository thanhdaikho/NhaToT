import React, { Component, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native'
import firestore from '@react-native-firebase/firestore'

const BottomSheet = (props) => {
    const item = props
    const { postID, tittle, content, isVisible, onClose } = props;

    const postId = item.props.postID
    const [newTitle, setNewTitle] = useState(item.props.tittle)
    const [newDescription, setNewDescription] = useState(item.props.content)
    const handleUpdatePost = async (postId, newTitle, newDescription) => {
        try {
            const postRef = firestore().collection('Posts')
            const querysnapShot = await postRef.where('postID', '==', postId).get()
            querysnapShot.forEach(async (doc) => {
                await doc.ref.update({
                    tittle: newTitle,
                    content: newDescription
                })
            })
            console.log('Post updated successfully!');
            onClose(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    return (
        <View style={styles.backdrop}>
            <View style={styles.bottomSheet}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17, color: 'black', marginTop: 10 }}> Chỉnh Sửa</Text>
                    <TouchableOpacity onPress={() => onClose(false)} style={{ position: 'absolute', right: 25, marginTop: 10 }}>
                        <View>
                            <Text style={{fontSize: 22, fontWeight: 'bold',}}>×</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput style={{ borderWidth: 1, borderColor: 'gray', paddingStart: 10, marginHorizontal: 20, borderRadius: 7, marginTop: 25 }} value={newTitle} placeholder='Tiêu đề bài đăng' onChangeText={(text) => { setNewTitle(text) }} />
                <TextInput multiline={true} style={{ borderWidth: 1, borderColor: 'gray', paddingStart: 10, marginHorizontal: 20, borderRadius: 7, marginTop: 10, height: 130 }} value={newDescription} placeholder='Mô tả chi tiết' onChangeText={(text) => { setNewDescription(text) }} />
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#076ae0', marginHorizontal: 20, marginTop: 10, borderRadius: 7 }}>
                    <TouchableOpacity onPress={() => handleUpdatePost(postId, newTitle, newDescription)}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>LƯU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default BottomSheet
const styles = StyleSheet.create({
    backdrop: {
        zIndex: 1000,
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: "90%",
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    }
})
