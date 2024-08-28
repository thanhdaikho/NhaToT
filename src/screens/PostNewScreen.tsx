import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, TextInput, Alert, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacing from '../components/Spacing';
import BasicInput from '../components/BasicInput';
import Icon from 'react-native-vector-icons/Feather'
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { LogBox } from 'react-native';
import { format } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar'




LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews'])
const PostNewScreen = () => {
    const host = 'https://vapi.vnappmob.com/api/province/'
    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        callAPI(host)
    }, [])


    const callAPI = (api) => {
        return (
            axios.get(api)
                .then((respone) => {
                    try {
                        if (respone && respone.data.results && Array.isArray(respone.data.results)) {
                            const provinceArray = respone.data.results.map((item) => ({
                                label: item.province_name,
                                value: item.province_id
                            }));
                            setProvinceData(provinceArray);
                        } else {
                            console.error('Invalid API response format:');
                        }
                    } catch (error) {
                        console.error('Error processing API data:', error);
                    }
                }
                )
        )
    }
    const callDistrictAPI = (api) => {
        return (
            axios.get(api)
                .then((respone) => {
                    try {
                        if (respone && respone.data.results && Array.isArray(respone.data.results)) {
                            const districtArray = respone.data.results.map((item) => ({
                                label: item.district_name,
                                value: item.district_id
                            }));
                            setDistrictData(districtArray);
                        } else {
                            console.error('Invalid API response format:');
                        }
                    } catch (error) {
                        console.error('Error processing API data:', error);
                    }
                })
        )
    }
    const callWardAPI = (api) => {
        return (
            axios.get(api)
                .then((respone) => {
                    try {
                        if (respone && respone.data.results && Array.isArray(respone.data.results)) {
                            const wardArray = respone.data.results.map((item) => ({
                                label: item.ward_name,
                                value: item.ward_id
                            }));
                            setWardData(wardArray);
                        } else {
                            console.error('Invalid API response format:');
                        }
                    } catch (error) {
                        console.error('Error processing API data:', error);
                    }
                })
        )
    }
    const handleProvinceChange = (selectedItem) => {
        setSelectedProvince(selectedItem); // Save the selected province
        setSelectedWard(null)
        setSelectedDistrict(null)
        try {
            callDistrictAPI(`${host}district/${selectedItem.value}`)
        } catch (e) {
            console.log("ERROR: " + e)
        }
    };
    const handleDistrictChange = (selectedItem) => {
        setSelectedDistrict(selectedItem);
        try {
            callWardAPI(`${host}ward/${selectedItem.value}`)
        } catch (e) {
            console.log(e)
        }
    }
    const handleWardChange = (selectedItem) => {
        setSelectedWard(selectedItem)
    }


    // variables
    const snapPoints = useMemo(() => [200, 380], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    const handleCloseSheet = () => {
        setIsVisible(false)
    };
    const [imageError, setImageError] = useState('')
    const [categoryError, setCategoryError] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState('')
    const [rawAddress, setRawAddress] = useState('')
    const [typeOpen, setTypeOpen] = useState(false);
    const [bedRoomOpen, setBedroomOpen] = useState(false)
    const [bathRoomOpen, setBathroomOpen] = useState(false)
    const [directionOpen, setDirectionOpen] = useState(false)
    const [categoryValue, setCategoryValue] = useState(null);
    const [typeValue, setTypeValue] = useState(null)
    const [typeError, setTypeError] = useState('')
    const [totalFloor, setTotalFloor] = useState('')
    const [bedRoomNumsValue, setBedRoomNumsValue] = useState(null)
    const [bedRoomError, setBedRoomError] = useState('')
    const [bathRoomError, setBathRoomError] = useState('')
    const [directionError, setDirectionError] = useState('')
    const [landAreaError, setLandAreaError] = useState('')
    const [landWidthError, setLandWidthError] = useState('')
    const [landLenghtError, setLandLenghtError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [useLandAreaError, setUseLandAreaError] = useState('')
    const [postTitleError, setPostTittleError] = useState('')
    const [postDescriptionError, setPostDescriptionError] = useState('')
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [bathRoomNumsValue, setBathRoomNumsValue] = useState(null)
    const [directionValue, setDirectionValue] = useState(null)
    const [landArea, setLandArea] = useState('')
    const [useLandArea, setUseLandArea] = useState('')
    const [landWidth, setLandWidth] = useState('')
    const [landLength, setLandLength] = useState('')
    const [price, setPrice] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postDescription, setPostDescription] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImages, setSelectedImages] = useState([]);
    const [isBox1Selected, setIsBox1Selected] = useState(true)
    const [isBox2Selected, setIsBox2Selected] = useState(false)
    const [categoryLabel, setCategoryLabel] = useState('')
    const [directionLabel, setDirectionLabel] = useState('')
    const [houseTypeLabel, setHouseTypeLabel] = useState('')
    const [categoriesList, setCategoriesList] = useState([
        { value: 'CC', label: 'Căn hộ/Chung cư' },
        { value: 'NHA', label: 'Nhà ở' },
        { value: 'DAT', label: 'Đất' },
        { value: 'VP', label: 'Văn phòng' },
        { value: 'MB', label: 'Mặt bằng kinh doanh' },
        { value: 'PT', label: 'Phòng trọ' },
    ]);
    const [houseTypeList, setHouseTypeList] = useState([
        { value: 'MP', label: 'Nhà mặt phố/Mặt tiền' },
        { value: 'HEM', label: 'Nhà ngõ/Hẻm' },
        { value: 'BT', label: 'Nhà biệt thự' },
        { value: 'NPLK', label: 'Nhà phố liền kề' }
    ])
    const [bedRoomNumsList, setBedRoomNumsList] = useState([
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '4+', label: '4+' }
    ])
    const [bathRoomNumsList, setBathRoomNumsList] = useState([
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '4+', label: '4+' }
    ])
    const [directionList, setDirectionList] = useState([
        { value: 'Dong', label: 'Đông' },
        { value: 'Tay', label: 'Tây' },
        { value: 'Nam', label: 'Nam' },
        { value: 'Bắc', label: 'Bắc' },
        { value: 'DB', label: 'Đông Bắc' },
        { value: 'DN', label: 'Đông Nam' },
        { value: 'TB', label: 'Tây Bắc' },
        { value: 'TN', label: 'Tây Nam' }
    ])


    const handleAddressPicker = () => {
        setIsVisible(true);
    };
    const handleConfirmAddress = () => {
        if (rawAddress == '' || selectedProvince == null || selectedDistrict == null || selectedWard == null) {
            Alert.alert('Thông báo', 'Vui lòng nhập những thông tin cần thiết')
        } else {
            const addressString = `${rawAddress}, ${selectedWard?.label},${selectedDistrict?.label}, ${selectedProvince?.label}`
            setAddress(addressString)
            setIsVisible(false)
            setAddressError('')
        }
    }

    const handleNewPostCheckValid = async () => {
        setIsLoading(true)
        setCategoryError('')
        setAddressError('')
        setTypeError('')
        setBedRoomError('')
        setBathRoomError('')
        setDirectionError('')
        setLandAreaError('')
        setUseLandAreaError('')
        setLandLenghtError('')
        setLandWidthError('')
        setPriceError('')
        setPostTittleError('')
        setPostDescriptionError('')
        setImageError('')
        if (categoryValue == null) {
            setCategoryError('Vui lòng chọn một danh mục')
            setIsLoading(false)
        }
        if (address == '') {
            setAddressError('Vui lòng chọn địa chỉ BĐS')
            setIsLoading(false)
        }
        if (selectedImages.length === 0) {
            setImageError('Vui lòng chọn hình ảnh')
            setIsLoading(false)
        }
        if (typeValue == null) {
            setTypeError('Vui lòng chọn loại hình nhà ở')
            setIsLoading(false)
        }
        if (bedRoomNumsValue == null) {
            setBedRoomError('Lỗi')
            setIsLoading(false)
        }
        if (bathRoomNumsValue == null) {
            setBathRoomError('Lỗi')
            setIsLoading(false)
        }
        if (directionValue == null) {
            setDirectionError('Lỗi')
            setIsLoading(false)
        }
        if (landArea == '') {
            setLandAreaError('Vui lòng nhập diện tích BĐS')
            setIsLoading(false)
        }
        if (useLandArea == '') {
            setUseLandAreaError('Vui lòng nhập diện tích sử dụng')
            setIsLoading(false)
        }
        if (landLength == '') {
            setLandLenghtError('Lỗi')
            setIsLoading(false)

        }
        if (landWidth == '') {
            setLandWidthError('Lỗi')
            setIsLoading(false)

        }
        if (price == '') {
            setPriceError('Vui lòng nhập giá BĐS')
            setIsLoading(false)

        }
        if (postTitle == '') {
            setPostTittleError('Vui lòng nhập tiêu đề bài đăng')
            setIsLoading(false)

        }
        if (postDescription == '') {
            setPostDescriptionError('Vui lòng nhập nội dung bài đăng')
            setIsLoading(false)

        }
        if (
            categoryError === '' &&
            addressError === '' &&
            typeError === '' &&
            bedRoomError === '' &&
            bathRoomError === '' &&
            directionError === '' &&
            landAreaError === '' &&
            useLandAreaError === '' &&
            landLenghtError === '' &&
            landWidthError === '' &&
            priceError === '' &&
            postTitleError === '' &&
            postDescriptionError === ''
        ) {
            try {
                const user = auth().currentUser;
                const userID = user?.uid;
                const currentDate = new Date();
                const formattedDate = format(currentDate, 'HHmmssddMMyyyy');
                const postID = userID + formattedDate;
                const imgDownloadUrls = await uploadImagesToFirebase(selectedImages, postID);
                await uploadToFirestore(postID, userID, categoryLabel, address, houseTypeLabel, bedRoomNumsValue, bathRoomNumsValue, directionLabel, totalFloor, landWidth, landLength, landArea, useLandArea, price, postTitle, postDescription, imgDownloadUrls);
                setIsLoading(false);
                Snackbar.show({text: 'Đăng bài viết thành công'})
            } catch (error) {
                console.error('Lỗi khi xử lý:', error);
                setIsLoading(false);
            }
        }
    }


    const uploadToFirestore = async (postID, userID, categoryLabel, address, houseTypeLabel, bedRoomNumsValue, bathRoomNumsValue, directionLabel, totalFloor, landWidth, landLength, landArea, useLandArea, price, postTitle, postDescription, imgDownloadUrls) => {
        try {
            await firestore().collection('Posts').add({
                postID,
                userID,
                categoryId: categoryLabel,
                address,
                type: houseTypeLabel,
                bedRoom: bedRoomNumsValue,
                bathRoom: bathRoomNumsValue,
                maindoorDirection: directionLabel,
                floor: totalFloor,
                width: landWidth,
                length: landLength,
                landArea,
                useLandArea,
                price,
                tittle: postTitle,
                content: postDescription,
                image: imgDownloadUrls
            });

            console.log('Post uploaded successfully!');
        } catch (e) {
            console.log('Lỗi khi đăng Post: ' + e);
            throw e;
        }
    };

    const uploadImagesToFirebase = async (selectedImage, postId) => {
        const reference = storage().ref(`/${postId}/`);
        const downloadUrls = [];

        try {
            for (let i = 0; i < selectedImage.length; i++) {
                const timestamp = new Date().getTime();
                const fileName = `${timestamp}_${i}.jpg`;
                const uri = selectedImage[i].uri;
                const imageRef = reference.child(fileName);

                const path = Platform.OS === 'android' ? 'file://' + uri : uri;
                await imageRef.putFile(path);
                const url = await imageRef.getDownloadURL()
                downloadUrls.push(url)
            }
            return downloadUrls
        } catch (error) {
            console.error("Upload failed:", error.message);
            throw new Error("Upload failed");
        }
    };


    const handleResourcePicker = async () => {
        try {
            const readStoragePermission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
            const granted = await PermissionsAndroid.request(readStoragePermission);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchImageLibrary({}, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.assets && response.assets.length > 0) {
                        const selectedImage = { uri: response.assets[0].uri };
                        setSelectedImages(prevImages => [...prevImages, selectedImage]); // Chỉ cần thêm selectedImage vào mảng
                    }
                });
            } else {
                console.log('Permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCategoryChange = (value) => {
        setCategoryError('')
        const selectedCategoryValue = categoriesList.find(item => item.value === value)
        const selectedCategoryLabel = selectedCategoryValue ? selectedCategoryValue.label : '';
        setCategoryLabel(selectedCategoryLabel);
    }

    const handleDirectionChange = (value) => {
        setDirectionError('')
        const selectedDirectionValue = directionList.find(item => item.value === value)
        const selectedDirectLabel = selectedDirectionValue ? selectedDirectionValue.label : ''
        setDirectionLabel(selectedDirectLabel)
        console.log(directionLabel)
    }
    const handleHouseTypeChange = (value) => {
        setTypeError('')
        const selectedHouseTypeValue = houseTypeList.find(item => item.value === value)
        const selectedHouseTypeLabel = selectedHouseTypeValue ? selectedHouseTypeValue.label : ''
        setHouseTypeLabel(selectedHouseTypeLabel)
        console.log(houseTypeLabel)
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <DropDownPicker
                        placeholder="Danh mục"
                        placeholderStyle={{
                            fontWeight: '800',
                            color: 'gray',
                        }}
                        open={categoryOpen}
                        value={categoryValue}
                        items={categoriesList}
                        setOpen={setCategoryOpen}
                        setValue={setCategoryValue}
                        setItems={setCategoriesList}
                        listMode="MODAL"
                        onChangeValue={(value) => handleCategoryChange(value)}
                        labelStyle={{
                            fontWeight: '800',
                        }}
                        containerStyle={{ width: '88%', zIndex: 1, alignSelf: 'center', marginTop: 20, marginBottom: 8 }}
                        style={categoryError ? { borderColor: 'red' } : { borderColor: 'gray' }}
                    />
                    {categoryError && <Text style={styles.errorText}>{categoryError}</Text>}
                    <Spacing height={10} color={'#dbd7d7'} />
                    <View>
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>ĐỊA CHỈ BĐS VÀ HÌNH ẢNH</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <Text>Xem thêm về </Text>
                            <TouchableOpacity>
                                <Text style={{ textDecorationLine: 'underline', color: '#076ae0' }}>Quy định đăng tin của Nhà Tốt.</Text>
                            </TouchableOpacity>
                        </View>
                        <BasicInput
                            placeHolder={'Địa chỉ'}
                            onChangeText={undefined}
                            error={addressError}
                            warn={undefined}
                            customInputStyle={styles.addressInput}
                            onPress={handleAddressPicker}
                            value={address}

                        />
                        {addressError && <Text style={styles.errorText}>{addressError}</Text>}

                    </View>
                    <View style={styles.imgPicker}>
                        <View style={{ flexDirection: selectedImages.length > 0 ? 'row' : 'column' }}>
                            {selectedImages.length > 0 ? (
                                <>
                                    <TouchableOpacity onPress={handleResourcePicker} style={{
                                        width: 120,
                                        height: 120,
                                        borderColor: '#076ae0',
                                        borderWidth: 1,
                                        marginStart: 25,
                                        borderRadius: 5,
                                        borderStyle: 'dashed',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#eeeeee',
                                        flexDirection: 'column'
                                    }}>
                                        <Image source={require('../assets/imgs/imagepicker.png')} style={{ width: 80, height: 80 }} />
                                    </TouchableOpacity>
                                    <FlatList
                                        data={selectedImages}
                                        renderItem={({ item }) => (
                                            <Image source={{ uri: item.uri }} style={{ width: 120, height: 120, marginStart: 5 }} />
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        style={{
                                            marginEnd: 25
                                        }}
                                    />
                                </>) : (
                                <>
                                    <TouchableOpacity onPress={handleResourcePicker} style={{
                                        width: '88%',
                                        height: 120,
                                        borderColor: imageError ? 'red' : '#076ae0',
                                        borderWidth: 1,
                                        alignSelf: 'center',
                                        borderRadius: 5,
                                        borderStyle: 'dashed',
                                        justifyContent: 'center',
                                        alignItems: selectedImages.length > 0 ? null : 'center',
                                        backgroundColor: '#eeeeee',
                                        flexDirection: selectedImages.length > 0 ? 'row' : 'column'
                                    }}>
                                        <Image source={require('../assets/imgs/imagepicker.png')} style={{ width: 80, height: 80 }} />
                                        <Text>ĐĂNG TỪ 03 ĐẾN 12 HÌNH</Text>
                                    </TouchableOpacity>
                                </>
                            )}


                        </View>
                        <TouchableOpacity>
                            <View style={{ width: '88%', height: 120, borderColor: '#076ae0', borderWidth: 1, alignSelf: 'center', borderRadius: 5, borderStyle: 'dashed', marginVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eeeeee' }}>
                                <Image source={require('../assets/imgs/videopicker.png')} style={{ width: 68, height: 68 }} />
                                <Text>(Tùy chọn) ĐĂNG TỐI ĐA 1 VIDEO</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Spacing height={10} color={'#dbd7d7'} />
                    <View>
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>THÔNG TIN CHI TIẾT</Text>
                        <DropDownPicker
                            placeholder="Loại hình nhà ở "
                            placeholderStyle={{
                                fontWeight: '800',
                                color: 'gray',
                            }}
                            open={typeOpen}
                            value={typeValue}
                            items={houseTypeList}
                            setOpen={setTypeOpen}
                            setValue={setTypeValue}
                            setItems={setHouseTypeList}
                            listMode="MODAL"
                            onChangeValue={(value) => handleHouseTypeChange(value)}
                            labelStyle={{
                                fontWeight: '800',
                            }}
                            containerStyle={{ width: '88%', zIndex: 1, alignSelf: 'center', marginTop: 10 }}
                            style={typeError ? { borderColor: 'red' } : { borderColor: 'gray' }}
                        />
                        {typeError && <Text style={{ color: 'red', marginStart: 30, marginTop: 5, marginBottom: -5 }}>{typeError}</Text>}
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <DropDownPicker
                                placeholder="Số phòng ngủ"
                                placeholderStyle={{
                                    fontWeight: '800',
                                    color: 'gray',
                                }}
                                open={bedRoomOpen}
                                value={bedRoomNumsValue}
                                items={bedRoomNumsList}
                                setOpen={setBedroomOpen}
                                setValue={setBedRoomNumsValue}
                                setItems={setBedRoomNumsList}
                                onChangeValue={() => setCategoryError('')}
                                textStyle={{}}
                                labelStyle={{
                                    fontWeight: '800',
                                }}
                                containerStyle={{ width: '42%', zIndex: 1000, alignSelf: 'center', marginVertical: 10, marginEnd: 10 }}
                                style={bedRoomError ? { borderColor: 'red' } : { borderColor: 'gray' }}
                            />
                            <DropDownPicker
                                placeholder="Số phòng vệ sinh"
                                placeholderStyle={{
                                    fontWeight: '800',
                                    color: 'gray',
                                }}
                                open={bathRoomOpen}
                                value={bathRoomNumsValue}
                                items={bathRoomNumsList}
                                setOpen={setBathroomOpen}
                                setValue={setBathRoomNumsValue}
                                setItems={setBathRoomNumsList}
                                onChangeValue={() => setCategoryError('')}
                                textStyle={{}}
                                labelStyle={{
                                    fontWeight: '800',
                                }}
                                containerStyle={{ width: '42%', zIndex: 1, alignSelf: 'center', marginVertical: 10, marginStart: 5 }}
                                style={bathRoomError ? { borderColor: 'red' } : { borderColor: 'gray' }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <DropDownPicker
                                placeholder="Hướng cửa chính"
                                placeholderStyle={{
                                    fontWeight: '800',
                                    color: 'gray',
                                }}
                                open={directionOpen}
                                value={directionValue}
                                items={directionList}
                                setOpen={setDirectionOpen}
                                setValue={setDirectionValue}
                                setItems={setDirectionList}
                                listMode="MODAL"
                                onChangeValue={(value) => handleDirectionChange(value)}
                                labelStyle={{
                                    fontWeight: '800',
                                }}
                                containerStyle={{ width: '42%', zIndex: 1, alignSelf: 'center', marginBottom: 10, marginEnd: 10 }}
                                style={directionError ? { borderColor: 'red' } : { borderColor: 'gray' }}
                            />
                            <TextInput
                                placeholder='Tổng số tầng'
                                value={totalFloor}
                                onChangeText={(text) => { setTotalFloor(text) }}
                                keyboardType='number-pad'
                                style={{ borderWidth: 1, borderRadius: 7, borderColor: 'gray', height: 50, width: '42%', paddingStart: 10, marginStart: 4 }} />
                        </View>
                    </View>
                    <Spacing height={10} color={'#dbd7d7'} />
                    <View>
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>DIỆN TÍCH & GIÁ</Text>
                        <View>
                            <TextInput
                                placeholder='Diện tích đất'
                                style={{ borderWidth: 1, borderRadius: 8, borderColor: landAreaError ? 'red' : 'gray', paddingStart: 10, width: '88%', height: 50, marginVertical: 10, marginTop: 10, alignSelf: 'center' }}
                                keyboardType='number-pad'
                                value={landArea}
                                onChangeText={(text) => { setLandArea(text) }}
                            />
                            {landAreaError && <Text style={styles.errorText}>{landAreaError}</Text>}
                            <TextInput
                                placeholder='Diện tích sử dụng'
                                style={{ borderWidth: 1, borderRadius: 8, borderColor: useLandAreaError ? 'red' : 'gray', paddingStart: 10, width: '88%', height: 50, alignSelf: 'center' }}
                                keyboardType='number-pad'
                                value={useLandArea}
                                onChangeText={(text) => { setUseLandArea(text) }}
                            />
                            {useLandAreaError && <Text style={[styles.errorText, { marginTop: 5, marginBottom: -5 }]}>{useLandAreaError}</Text>}
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TextInput
                                    placeholder='Chiều dài'
                                    style={{ borderWidth: 1, borderRadius: 8, borderColor: landLenghtError ? 'red' : 'gray', paddingStart: 10, width: '42%', height: 50, marginVertical: 10, marginTop: 10, marginEnd: 7 }}
                                    keyboardType='number-pad'
                                    value={landLength}
                                    onChangeText={(text) => { setLandLength(text) }}
                                />
                                <TextInput
                                    placeholder='Chiều rộng'
                                    style={{ borderWidth: 1, borderRadius: 8, borderColor: landWidthError ? 'red' : 'gray', paddingStart: 10, width: '42%', height: 50, marginVertical: 10, marginTop: 10, marginStart: 8 }}
                                    keyboardType='number-pad'
                                    value={landWidth}
                                    onChangeText={(text) => { setLandWidth(text) }}
                                />
                            </View>
                            <TextInput
                                placeholder='Giá'
                                style={{ borderWidth: 1, borderRadius: 8, borderColor: priceError ? 'red' : 'gray', paddingStart: 10, width: '88%', height: 50, marginBottom: 10, alignSelf: 'center' }}
                                keyboardType='number-pad'
                                value={price}
                                onChangeText={(text) => { setPrice(text) }}
                            />
                            {priceError && <Text style={styles.errorText}>{priceError}</Text>}
                        </View>
                        <Spacing height={10} color={'#dbd7d7'} />
                        <View>
                            <Text style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>TIÊU ĐỀ TIN ĐĂNG VÀ ĐÁNH GIÁ CHI TIẾT</Text>
                            <TextInput
                                placeholder='Tiêu đề tin đăng'
                                style={{ borderWidth: 1, borderRadius: 8, borderColor: postTitleError ? 'red' : 'gray', paddingStart: 10, width: '88%', height: 50, marginTop: 10, alignSelf: 'center' }}
                                value={postTitle}
                                onChangeText={(text) => { setPostTitle(text) }} />
                            {postTitleError && <Text style={[styles.errorText, { marginTop: 5, marginBottom: -5 }]}>{postTitleError}</Text>}
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    width: '88%',
                                    marginBottom: 10
                                }}>

                                    <TextInput
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            borderColor: postDescriptionError ? 'red' : 'gray',
                                            paddingStart: 10,
                                            width: '100%',
                                            height: 150,
                                            marginTop: 10,
                                            zIndex: 1
                                        }}
                                        value={postDescription}
                                        onChangeText={(text) => { if (text == '') { setPlaceholderVisible(true) } else { setPlaceholderVisible(false) } setPostDescription(text) }}
                                        multiline={true}
                                    />
                                    {placeholderVisible ? (<Text style={{
                                        position: 'absolute',
                                        top: 60,
                                        left: 10,
                                        color: 'gray',
                                    }}>
                                        Mô tả chi tiết{'\n'}{'\n'}Nên có: Loại nhà ở, vị trí, tiện ích, diện tích,
                                        số phòng, thông tin pháp lý, nội thất, v.v.
                                    </Text>) : null}
                                </View>
                            </View>
                            {postDescriptionError && <Text style={[styles.errorText, { marginTop: -5, marginBottom: 5 }]}>{postDescriptionError}</Text>}

                        </View>
                        <Spacing height={10} color={'#dbd7d7'} />
                        <View>
                            <Text style={{ marginTop: 10, marginStart: 25, fontSize: 16 }}>Bạn là</Text>
                            <View style={{ flexDirection: 'row', marginStart: 25, marginVertical: 15 }}>
                                <TouchableOpacity
                                    style={{ width: 70, height: 36, backgroundColor: isBox1Selected ? '#076ae0' : '#EEE7E9', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => { if (isBox1Selected) { return } else { setIsBox1Selected(true), setIsBox2Selected(false) } }}>
                                    <Text style={{ color: isBox1Selected ? '#fff' : 'black' }}>Cá nhân</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 70, height: 36, backgroundColor: isBox2Selected ? '#076ae0' : '#EEE7E9', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginStart: 15 }}
                                    onPress={() => { if (isBox2Selected) { return } else { setIsBox2Selected(true), setIsBox1Selected(false) } }}>
                                    <Text style={{ color: isBox2Selected ? '#fff' : 'black' }}>Môi giới</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#076ae0',
                                    width: '88%',
                                    alignSelf: 'center',
                                    alignItems: 'center', // Căn giữa theo chiều ngang
                                    justifyContent: 'center', // Căn giữa theo chiều dọc
                                    marginTop: 10,
                                    height: 45,
                                    borderRadius: 7,
                                    marginBottom: 10
                                }}
                                onPress={handleNewPostCheckValid}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={"#fff"} size={16} />
                                ) : (
                                    <Text style={{ fontWeight: 800, color: '#fff', fontSize: 17 }}>
                                        Đăng Tin
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >

            </ScrollView>
            {isVisible && (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                >
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.headerText}>Địa chỉ</Text>
                        <TouchableOpacity onPress={handleCloseSheet}>
                            <Icon name='x' size={20} color={'black'} style={{ marginEnd: 8 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomSheetBody}>
                        <Dropdown
                            data={provinceData}
                            labelField="label"
                            valueField="value"
                            style={{ width: '100%', borderWidth: 1, padding: 10, borderRadius: 12, marginEnd: 15, borderColor: 'gray', height: 50 }}
                            placeholder='Chọn tỉnh, thành phố'
                            onChange={handleProvinceChange}
                        />
                        <Dropdown
                            data={districtData}
                            labelField="label"
                            valueField="value"
                            style={{ width: '100%', borderWidth: 1, padding: 10, borderRadius: 12, borderColor: 'gray', height: 50, marginVertical: 13 }}
                            placeholder='Chọn quận, huyện, thị xã'
                            onChange={handleDistrictChange}
                        />
                        <Dropdown
                            data={wardData}
                            labelField="label"
                            valueField="value"
                            style={{ width: '100%', borderWidth: 1, padding: 10, borderRadius: 12, borderColor: 'gray', height: 50 }}
                            placeholder='Chọn phường, xã, thị trấn'
                            onChange={handleWardChange} />
                        <TextInput placeholder='Số nhà & Tên đường'
                            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, height: 50, marginVertical: 13, paddingStart: 10, color: 'black' }}
                            value={rawAddress}
                            onChangeText={(text) => { setRawAddress(text) }} />
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#076ae0',
                                width: '88%',
                                alignSelf: 'center',
                                alignItems: 'center', // Căn giữa theo chiều ngang
                                justifyContent: 'center', // Căn giữa theo chiều dọc
                                marginTop: 10,
                                height: 45,
                                borderRadius: 7,
                                marginBottom: 10
                            }}
                            onPress={handleConfirmAddress}
                        >
                            <Text style={{ fontWeight: 800, color: '#fff', fontSize: 17 }}>
                                XÁC NHẬN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>)}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    errorText: {
        color: 'red',
        marginStart: 30,
        marginBottom: 5,
        marginTop: -5
    },
    addressInput: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    bottomSheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 2,
        borderColor: 'gray',
        flex: 1,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        zIndex: 1000,
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        flex: 1, // Added to make the text take available space
        textAlign: 'center',
        marginStart: 26
    },
    bottomSheetBody: {
        flex: 1,
        padding: 10
    },
    imgPicker: {
    }
});


export default PostNewScreen;