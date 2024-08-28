import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/Feather';
import Carousel from '../components/Carousel';
import Spacing from '../components/Spacing';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [buyAndSellTagList, setBuyAndSellTagList] = useState([])
    useEffect(() => {
        const houseData = firestore()
            .collection('Posts')
            .onSnapshot(querySnapshot => {
                const updatedList = [];
                querySnapshot.forEach(documentSnapshot => {
                    const data = documentSnapshot.data();
                    updatedList.push(data);
                });
                setBuyAndSellTagList(updatedList);
                console.log(updatedList);
            });

        return () => houseData();
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
    const handleOnItemClick = (item) => {
        navigation.navigate('MainDetailScreen', { item })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: 150, height: 200, margin: 10 }}>
                <TouchableOpacity onPress={() => { handleOnItemClick(item) }}>
                    {item.image && item.image.length > 0 && (
                        <Image source={{ uri: item.image[0] }} style={{ width: '100%', height: 100, borderRadius: 5 }} />
                    )}
                    <Text style={{ color: 'black', marginTop: 5, lineHeight: 25 }}>
                        {item.tittle}
                    </Text>
                    <Text style={{
                        fontSize: 13,
                        color: 'gray',
                        marginTop: 6
                    }}>{item.landArea} m² - {item.bedRoom} PN</Text>
                    {item.price && (
                        <Text style={{ color: '#c91b0e', fontWeight: 'bold', fontSize: 18 }}>{convertCurrency(item.price)}</Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor="#076ae0" barStyle={'light-content'} />
                <View style={styles.headerContainer}>
                    <View style={styles.topHeader}>
                        {/* CODE */}
                        <SearchBar searchStyle={styles.searchInput} />
                        <TouchableOpacity style={{ alignSelf: 'center', marginStart: 10 }}>
                            <Icon name='bell' size={26} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginStart: 15 }} onPress={() => navigation.navigate('ChatScreen')}>
                            <Icon name='send' size={26} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bodyContainer}>
                    {/* CODE */}
                    <View style={styles.topBody}>
                        <Carousel />
                        {/* Box */}
                        <Text style={{ padding: 15, color: 'black', fontWeight: 'bold', fontSize: 17 }}>Khám phá Nhà Tốt</Text>
                        <View style={styles.box}>
                            <TouchableOpacity style={styles.innerBox}>
                                <Image source={require('../assets/imgs/investment.png')} style={{ width: 50, height: 50 }} />
                                <Text style={styles.boxText}>Mua bán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.innerBox}>
                                <Image source={require('../assets/imgs/house-key.png')} style={{ width: 50, height: 50 }} />
                                <Text style={styles.boxText}>Cho thuê</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.innerBox}>
                                <Image source={require('../assets/imgs/apartments.png')} style={{ width: 50, height: 50, marginTop: -7, marginBottom: 7 }} />
                                <Text style={styles.boxText}>Dự án</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.innerBox}>
                                <Image source={require('../assets/imgs/agreement.png')} style={{ width: 50, height: 50, marginTop: -5, marginBottom: 5 }} />
                                <Text style={styles.boxText}>Môi giới</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Box */}

                    </View>


                    <Spacing height={10} color={'#dbd7d7'} />


                    <View style={styles.centerBody}>
                        <Text style={{ padding: 15, color: 'black', fontWeight: 800, fontSize: 17 }}>Mua bán Bất động sản</Text>
                        <View>
                            {/* CODE */}
                            <FlatList
                                data={buyAndSellTagList}
                                renderItem={renderItem}
                                horizontal
                                style={{ marginHorizontal: 15 }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, padding: 11, borderColor: '#d6d3cb' }}>
                            <Text>Xem tất cả {buyAndSellTagList.length} bài đăng</Text>
                        </View>
                    </View>
                    <Spacing height={10} color={'#dbd7d7'} />
                    <View style={styles.bottomBody}>
                        <View style={styles.topDecord}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Trở thành Đối tác Nhà Tốt</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/imgs/doitac.png')} style={{ width: 85, height: 85 }} />
                                <Text style={{fontSize: 13, color: '#ee5803', fontWeight: 'bold', marginVertical: 5}}>Nhãn đối tác</Text>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Tăng 40% hiệu quả tin đăng</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/imgs/tiepcan.png')} style={{ width: 85, height: 85 }} />
                                <Text style={{fontSize: 13, color: '#ee5803', fontWeight: 'bold', marginVertical: 5}}>Tin đăng tiếp cận</Text>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Tăng kết nối</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/imgs/ketnoi.png')} style={{ width: 85, height: 85 }} />
                                <Text style={{fontSize: 13, color: '#ee5803', fontWeight: 'bold', marginVertical: 5}}>Tài Khoản Doanh Nghiệp</Text>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Tăng hiệu quả quản lý</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, padding: 11, borderColor: '#d6d3cb'}}>
                            <Text>Tìm hiểu thêm</Text>
                        </View>
                        <Spacing height={10} color={'#dbd7d7'} />
                        <View style={{marginBottom: 40}}></View>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    {/* CODE */}
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#076ae0',
        padding: 13,
    },
    bodyContainer: {
        flex: 3
    },
    footerContainer: {
        flex: 1
    },
    searchInput: {
    },
    topHeader: {
        flexDirection: 'row'
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    innerBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    boxText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    topDecord: {
        width: '100%',
        height: 43,
        backgroundColor: '#0b0a2b',
        justifyContent: 'center',
        paddingStart: 15
    }

});