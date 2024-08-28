import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const FavoriteScreen = ({ navigation }) => {
    const favorites = useSelector((state) => state.favorites.favorites);
    const [favoritePosts, setFavoritePosts] = useState([]);
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
        const fetchFavoritePosts = async () => {
            const postsRef = firestore().collection('Posts');
            const queriedPosts = [];
            for (const postId of favorites) {
                const snapshot = await postsRef.where('postID', '==', postId).get();
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    queriedPosts.push(data);
                });
            }
            setFavoritePosts(queriedPosts);
        };

        if (favorites.length > 0) {
            fetchFavoritePosts();
        }
    }, [favorites]);

    const handleItemPress = (item) => {
        navigation.navigate('MainDetailScreen', { item });
    };

    const renderPostItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={{
                padding: 16,
                borderColor: '#ccc',
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
                marginBottom: 5
            }}>
                <Image source={{ uri: item.image[0] }} style={{ width: 90, height: 130 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginStart: 10, marginTop: 5 }}>{item.tittle}</Text>
                    <Text style={{ color: '#c91b0e', fontWeight: 'bold', fontSize: 17, marginTop: 5, marginStart: 10 }}>{convertCurrency(item.price)} {'-'} <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 17 }}>{item.landArea} m²</Text></Text>
                    <Text style={{ fontSize: 15, color: 'gray', marginTop: 6, marginStart: 10 }}>{item.landArea} m² - {item.bedRoom} PN</Text>
                    <Text style={{ fontSize: 15, color: '#888', marginTop: 24, marginStart: 10 }} numberOfLines={2}>{item.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={favoritePosts}
                keyExtractor={(item) => item.postID}
                renderItem={renderPostItem}
            />
        </View>
    );
};

export default FavoriteScreen;
