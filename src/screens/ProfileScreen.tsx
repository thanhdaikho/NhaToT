import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'


const ProfileScreen = ({ navigation }) => {
  const handleSignout = async () => {
    console.log('clicked')
    try {
      await AsyncStorage.removeItem('userToken');
      await auth().signOut();
      navigation.replace('SplashScreen');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleSignout} style={{width: 250, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#076ae0', borderRadius: 7}}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')} style={{width: 250, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#076ae0', borderRadius: 7}}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Favorite</Text>
      </TouchableOpacity> */}
      <View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image source={require('../assets/imgs/user.png')} style={{ width: 75, height: 75 }} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginStart: 10 }}>Nguyễn Phúc Thành</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginHorizontal: 10, marginStart: 10, fontWeight: 'bold', color: 'black', fontSize: 18 }}>5.0</Text>
              <Image source={require('../assets/imgs/5star.png')} style={{ width: 90, height: 30 }} />
            </View>
            <Text style={{ marginStart: 10, marginTop: 5 }}><Text style={{ fontWeight: 'bold', color: 'black' }}>0</Text> người theo dõi <Text>| </Text><Text style={{ fontWeight: 'bold', color: 'black' }}>0</Text> người đang theo dõi</Text>
          </View>

        </View>
      </View>
      <View style={{width: '100%', height: 40, backgroundColor: '#e4e7ed', justifyContent: 'center'}}>
        <Text style={{marginStart: 10, color: 'black', fontWeight: 'bold'}}>Quản lí đơn hàng</Text>
      </View>
      <View style={{justifyContent: 'center', borderBottomWidth: 1, height: 55, borderColor: '#cbd0d4'}}>
        <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}}>
          <Icon name='person-circle' size={30} color={'#3d87ba'} style={{marginStart: 10, marginEnd: 10}}/>
          <Text style={{ color: 'black', fontSize: 16 }}>Thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', borderBottomWidth: 1, height: 55, borderColor: '#cbd0d4'}}>
        <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={() => navigation.navigate('FavoriteScreen')}>
          <Icon name='heart-circle' size={30} color={'red'} style={{marginStart: 10, marginEnd: 10}}/>
          <Text style={{ color: 'black', fontSize: 16 }}>Tin đăng đã lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', borderBottomWidth: 1, height: 55, borderColor: '#cbd0d4'}}>
        <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={handleSignout}>
          <Icon name='log-out' size={30} color={'#dec221'} style={{marginStart: 10, marginEnd: 10}}/>
          <Text style={{ color: 'black', fontSize: 16 }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
