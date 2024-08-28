import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity, ScrollView, Touchable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/favoriteSlice';
import Icon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Spacing from '../components/Spacing';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const MainDetail = ({ route, navigation }) => {
    const { item } = route.params;
    const userId = auth().currentUser?.uid
    const [userIdFromPost, setUserIdFromPost] = useState('')

    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [userPostingData, setUserPostingData] = useState({})
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.includes(item.postID);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(item.postID));
    };
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
        // Lấy kích thước thực của ảnh đầu tiên trong danh sách
        Image.getSize(item.image[0], (width, height) => {
            // Chiều cao mới dựa trên chiều rộng của màn hình và tỷ lệ của ảnh
            const newHeight = (Dimensions.get('window').width / width) * height;
            setImageSize({ width: Dimensions.get('window').width, height: newHeight });
        });
    }, [item.image]);
    useEffect(() => {
        const getUserPosting = firestore()
            .collection('Posts')
            .where('postID', '==', item.postID)
            .onSnapshot(querySnapshot => {
                if (!querySnapshot.empty) {
                    // Nếu có bản ghi khớp, lấy userId từ bản ghi đầu tiên
                    const post = querySnapshot.docs[0].data();
                    const userIdFromDatabase = post.userID;
                    setUserIdFromPost(userIdFromDatabase);
                } else {
                    // Không có bản ghi khớp, có thể xử lý theo ý bạn
                    console.log('Không tìm thấy bản ghi với postId tương ứng.');
                }
            })
        return () => getUserPosting();
    }, [userId, item.postID])
    useEffect(() => {
        // Kiểm tra xem có userId và userId có giá trị hay không
        if (item.userID) {
            const getUserInfo = firestore()
                .collection('Users')
                .where('id', '==', item.userID)
                .onSnapshot(querySnapshot => {
                    if (!querySnapshot.empty) {
                        // Lấy dữ liệu từ bản ghi đầu tiên nếu có
                        const user = querySnapshot.docs[0].data();

                        // Kiểm tra xem trường 'id' có tồn tại hay không
                        if (user.id) {
                            const userData = {
                                email: user.email || '',
                                name: user.name || '',
                                phoneNumber: user.phoneNumber || ''
                            };
                            setUserPostingData(userData);
                        } else {
                            console.error('Trường "id" không tồn tại trong dữ liệu người dùng.');
                        }
                    } else {
                        console.error('Không tìm thấy người dùng với userId tương ứng.');
                    }
                });

            return () => getUserInfo();
        }
    }, [item.userID]);

    const renderItem = ({ item: imageItem }) => (
        <Image
            source={{ uri: imageItem }}
            style={{
                width: imageSize.width,
                height: imageSize.height,
                marginBottom: 5
            }}
            resizeMode='contain' />
    );
    const handleNavigationToMessageScreen = (item) => {
        navigation.navigate('MessageScreen', {
            item: item,
            userPostingData: userPostingData,
            userIdFromPost: userIdFromPost
        })
    }


    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <FlatList
                            data={item.image}
                            horizontal
                            renderItem={renderItem}
                            keyExtractor={(imageItem, index) => index.toString()}
                            style={{ width: '100%' }}
                            pagingEnabled
                        />
                        <View style={styles.otherInfo}>
                            <Text style={styles.title}>{item.tittle}</Text>
                            <View style={styles.rowStyle}>
                                <Text style={{ color: '#c91b0e', fontWeight: 'bold', fontSize: 17, marginTop: 5 }}>{convertCurrency(item.price)} {'-'} <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 17 }}>{item.landArea} m²</Text></Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }}>
                                    <TouchableOpacity>
                                        <Icon name='share-2' size={23} color={'black'} />
                                    </TouchableOpacity>
                                    <Text style={{ marginEnd: 15, marginStart: 6, color: 'black', fontSize: 16, fontWeight: 'bold', }}>Chia sẻ</Text>
                                    <TouchableOpacity onPress={handleToggleFavorite}>
                                        {isFavorite ? (
                                        <IonIcon name='heart' size={23} color={'red'} />                                    ) : (
                                            <IonIcon name='heart-outline' size={23} color={'red'} />
                                        )}
                                    </TouchableOpacity>
                                    <Text style={{ marginHorizontal: 6, color: 'black', fontSize: 16, fontWeight: 'bold' }}>Lưu</Text>
                                </View>

                            </View>
                            <View style={[styles.rowStyle, { alignItems: 'center' }]}>
                                <Icon name='map-pin' style={{ marginTop: 10 }} size={18} color={'gray'} />
                                <Text style={{ marginTop: 5, marginStart: 5 }}>{item.address}</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                <Text style={{ color: '#4075BA', fontWeight: 'bold', fontSize: 15 }}>Xem bản đồ </Text>
                                <Icon name='chevron-right' size={18} color='#4075BA' />
                            </TouchableOpacity>
                            <View style={[styles.rowStyle, { marginVertical: 10, alignItems: 'center' }]}>
                                <Icon name='user-check' size={18} />
                                <Text style={{ marginStart: 5 }}>Người dùng đã được xác minh bởi <Text style={{ color: '#076ae0', fontWeight: 'bold' }}> Nhà Tốt</Text></Text>
                            </View>
                        </View>

                    </View>

                </View>
                <Spacing height={10} color={'#dbd7d7'} />
                <View style={[styles.body, { marginBottom: 15 }]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}>Đặc điểm bất động sản</Text>
                    <View style={[styles.rowStyle, { justifyContent: 'space-between' }]}>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <IonIcon name='resize-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Tổng diện tích: {item.landArea} m²</Text>
                        </View>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <IonIcon name='home-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Loại hình BĐS: {item.type}</Text>
                        </View>
                    </View>
                    <View style={[styles.rowStyle, { justifyContent: 'space-between' }]}>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <IonIcon name='business-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Tổng số tầng: {item.floor}</Text>
                        </View>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <IonIcon name='compass-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Hướng cửa chính: Tây Bắc</Text>
                        </View>
                    </View>
                    <View style={[styles.rowStyle, { justifyContent: 'space-between' }]}>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <IonIcon name='bed-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Tổng số phòng ngủ: {item.bedRoom}</Text>
                        </View>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <MUIcon name='bathtub-outline' size={25} color={'black'} />
                            <Text style={{ marginStart: 7, color: 'black' }}>Tổng số phòng vệ sinh: {item.bathRoom}</Text>
                        </View>
                    </View>
                </View>
                <Spacing height={10} color={'#dbd7d7'} />
                <View style={styles.body}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}>Mô tả chi tiết</Text>
                        <Text style={{ color: 'black', lineHeight: 20, marginTop: 7, marginBottom: 10 }}>{item.content}</Text>
                    </View>
                </View>
                <Spacing height={10} color={'#dbd7d7'} />
                <View style={[styles.body, { marginBottom: 15 }]}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}>Thông tin người đăng</Text>
                        <View style={[styles.rowStyle, { marginTop: 10, alignItems: 'center' }]}>
                            <Image source={require('../assets/imgs/default_user.png')} style={{ width: 50, height: 50 }} />
                            <View style={{ justifyContent: 'center', marginStart: 10 }}>
                                <Text style={{ color: 'black', marginBottom: 5, fontWeight: 'bold', fontSize: 17 }}>{userPostingData.name}</Text>
                                <Text>{userPostingData.email}</Text>
                            </View>
                            {
                                userId === userIdFromPost ? null : (
                                    <View style={[styles.rowStyle, { position: 'absolute', right: 0 }]}>
                                        <TouchableOpacity>
                                            <Icon name='phone-call' size={27} color={'#076ae0'} style={{ marginEnd: 20 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { handleNavigationToMessageScreen(item) }}>
                                            <Icon name='send' size={27} color={'#076ae0'} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>
                <Spacing height={10} color={'#dbd7d7'} />
                <View >
                    <View style={[{ backgroundColor: '#076ae0', height: 50, alignItems: 'center' }, styles.rowStyle]}>
                        <Text style={{ marginStart: 10, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Gói vay tham khảo</Text>
                        <View style={[{ position: 'absolute', right: 0, alignItems: 'center' }, styles.rowStyle]}>
                            <Image source={require('../assets/imgs/logo.png')} style={{ width: 100, height: 60 }} />
                            <Text style={{ fontSize: 30, color: '#fff' }}>×</Text>
                            <Image source={require('../assets/imgs/vpb.png')} style={{ width: 100, height: 60 }} />
                        </View>
                    </View>
                    <View style={{ marginEnd: 5, marginStart: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, color: 'black' }}>Vay Mua Nhà</Text>
                        <Text style={{ lineHeight: 22, marginTop: 10, color: 'black', fontSize: 14 }}>Nhà Tốt giúp <Text style={{ color: '#076ae0', fontWeight: 'bold' }}>tính toán</Text> và <Text style={{ color: '#076ae0', fontWeight: 'bold' }}>tiếp cận các khoản vay mua nhà</Text> từ nhiều ngân hàng đối tác, phù hợp với từng nhu cầu riêng biệt của mỗi các nhân.<Text style={{ color: '#076ae0', fontWeight: 'bold' }}> Tìm hiểu thêm.</Text></Text>
                    </View>
                    <View style={{ marginStart: 15, marginTop: 22 }}>
                        <Image source={require('../assets/imgs/mhouse.png')} style={{ width: 35, height: 35, marginBottom: 10 }} />
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Hơn <Text style={{ fontSize: 17, color: '#076ae0' }}>30+ </Text>gói vay</Text>
                        <Text style={{ marginTop: 7, color: 'black', marginBottom: 20 }}>từ nhiều ngân hàng với <Text style={{ textDecorationLine: 'underline' }}>lãi suất thấp hơn thị trường.</Text></Text>
                        <View style={{ height: 1, marginEnd: 15, marginStart: 5, marginBottom: 20, backgroundColor: 'gray' }} />


                        <Image source={require('../assets/imgs/fmoney.png')} style={{ width: 40, height: 40, marginBottom: 10 }} />
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Có kết quả từ <Text style={{ fontSize: 17, color: '#076ae0' }}>3 - 5 ngày </Text></Text>
                        <Text style={{ marginTop: 7, color: 'black', marginBottom: 20 }}>thay bạn <Text style={{ textDecorationLine: 'underline' }}>làm mọi thủ tục.</Text></Text>
                        <View style={{ height: 1, marginEnd: 15, marginStart: 5, marginBottom: 10, backgroundColor: 'gray' }} />

                        <Image source={require('../assets/imgs/mhand.png')} style={{ width: 75, height: 60, marginBottom: 10, marginStart: -10 }} />
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Đền bù <Text style={{ fontSize: 17, color: '#076ae0' }}>1 Triệu </Text></Text>
                        <Text style={{ marginTop: 7, color: 'black', marginBottom: 20 }}>nếu ngân hàng từ chối <Text style={{ textDecorationLine: 'underline' }}>giải ngân.</Text></Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#076ae0', marginHorizontal: 15, borderRadius: 5, height: 40 }}>
                        <View>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>ĐĂNG KÝ VAY MUA NHÀ</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>hoặc</Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 5, height: 40, borderWidth: 1, borderColor: '#076ae0', marginBottom: 10 }}>
                        <View>
                            <Text style={{ color: '#076ae0', fontWeight: 'bold', fontSize: 16 }}>GỌI CHUYÊN GIA TƯ VẤN</Text>
                            <Text style={{ textAlign: 'center', fontSize: 11 }}>(miễn phí cước gọi)</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    image: {

    },
    title: {
        color: 'black',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    otherInfo: {
        marginHorizontal: 15
    },
    rowStyle: {
        flexDirection: 'row'
    },
    body: {
        marginHorizontal: 20,
        marginTop: 10
    }
});

export default MainDetail;
