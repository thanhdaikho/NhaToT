import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = () => {
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortByAsc, setSortByAsc] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await firestore().collection('Posts').get();
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          postID: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  const convertCurrency = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + ' tỷ';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + ' triệu';
    } else {
      return value.toString();
    }
  };

  const handleSearch = () => {
    const keyword = searchKeyword.toLowerCase().trim();
    if (keyword === '') {
      setFilteredPosts([]);
    } else {
      const filtered = posts.filter(post => post.tittle.toLowerCase().includes(keyword));
      setFilteredPosts(filtered);
    }
  };

  const handleSortByAsc = () => {
    const sorted = [...posts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setFilteredPosts([]); // Reset filtered posts
    setSortByAsc(true);
    setPosts(sorted);
  };

  const handleSortByDesc = () => {
    const sorted = [...posts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    setFilteredPosts([]); // Reset filtered posts
    setSortByAsc(false);
    setPosts(sorted);
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image[0] }} style={styles.postImage} />
      <Text style={styles.postTitle}>{item.tittle}</Text>
      <Text style={styles.postPrice}>{convertCurrency(parseFloat(item.price))}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm..."
        onChangeText={text => setSearchKeyword(text)}
        value={searchKeyword}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSortByAsc}>
          <Text style={styles.buttonText}>Sắp xếp giá tăng dần</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSortByDesc}>
          <Text style={styles.buttonText}>Sắp xếp giá giảm dần</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        keyExtractor={(item) => item.postID}
        renderItem={renderPostItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 16,
    color: 'green',
  },
});

export default SearchScreen;
