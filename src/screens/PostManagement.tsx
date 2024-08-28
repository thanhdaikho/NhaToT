import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Spacing from '../components/Spacing'
import BottomSheet from '../components/BottomSheet'
import Snackbar from 'react-native-snackbar'
const PostManagement = () => {
  const currentUserId = auth().currentUser?.uid
  const [postList, setPostList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [currentItemEditing, setCurrentItemEditing] = useState({})
  const handleCloseBottomSheet = (isVisible) => {
    setIsVisible(isVisible);
  };
  const handleEdit = (item) => {
    setCurrentItemEditing(item);
    setIsVisible(true);
  }
  const handleDelete = async (item) => {
    try {
      const postRef = firestore().collection('Posts')
      const querySnapshot = await postRef.where('postID', '==', item.postID).get()
      querySnapshot.forEach(async(doc) => {
        await doc.ref.delete()
      })
      console.log('Delete successful')
      Snackbar.show({
        text: 'Xóa thành công'
      })
    } catch (e) {
      console.log('Lỗi khi xóa: ' + e)
    }
  }
  const convertCurrency = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + ' tỷ';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + ' triệu';
    } else {
      return value.toString();
    }
  };
  useEffect(() => {
    const getAllPostFromUser = firestore()
      .collection('Posts')
      .where('userID', '==', currentUserId)
      .onSnapshot(querySnapshot => {
        const newList = []
        querySnapshot.forEach(doc => {
          newList.push(doc.data())
        })
        setPostList(newList)
      })

    return () => {
      // Clean up the subscription
      getAllPostFromUser();
    };
  }, [currentUserId]);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {postList.map((item, index) => {
          return (
            <View key={index} style={styles.postContainer}>
              <View style={{padding: 15}}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: item.image[0] }} style={{ width: 100, height: 150, borderRadius: 5 }} />
                  <View style={styles.contentContainer}>
                    <Text style={{ color: 'black' }}>{item.tittle}</Text>
                    <Text style={{ color: 'red', marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>{convertCurrency(item.price)}</Text>
                    <Text style={{ color: '#076ae0', marginTop: 5, marginEnd: 5 }}>{item.address}</Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, left: 10, gap: 20 }}>
                      <TouchableOpacity onPress={() => { handleEdit(item) }}>
                        <View style={{ backgroundColor: '#cc9425', padding: 7 }}>
                          <Text style={{ color: '#fff' }}>Chỉnh sửa</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#db3016', padding: 7 }}>
                        <TouchableOpacity onPress={() => { handleDelete(item) }}>
                          <Text style={{ color: '#fff' }}>Xóa</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Spacing height={10} color={'#dbd7d7'} />

            </View>
          )
        })}
      </ScrollView>
      {isVisible ? <BottomSheet props={currentItemEditing} isVisible={isVisible} onClose={handleCloseBottomSheet} /> : null}
    </View>

  )
}
export default PostManagement

const styles = StyleSheet.create({
  postContainer: {

    justifyContent: 'center',
  },
  contentContainer: {
    paddingStart: 10
  }
})
