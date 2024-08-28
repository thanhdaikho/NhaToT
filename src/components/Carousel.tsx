import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

const Carousel = () => {
    const screenWidth = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0);

    const flatlistRef = useRef()

    useEffect(() => {
        const intervalId = setInterval(() => {
          if (activeIndex === carouselData.length - 1) {
            flatlistRef.current.scrollToIndex({ index: 0, animated: true });
            setActiveIndex(0)
          } else {
            flatlistRef.current.scrollToIndex({ index: activeIndex + 1, animated: true });
            setActiveIndex(activeIndex + 1)
          }
        }, 2000);
    
        // Hủy interval khi component unmount
        return () => clearInterval(intervalId);
      }, [activeIndex]);

    const carouselData = [
        {
            id: 1,
            image: require('../assets/imgs/slider_3.png'),
        },
        {
            id: 2,
            image: require('../assets/imgs/slider_2.png'),
        },
        {
            id: 3,
            image: require('../assets/imgs/slider_1.png'),
        },
    ];

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image source={item.image} style={{ height: 230, width: screenWidth }} resizeMode="cover" />
            </View>
        );
    };

    const renderDotsIndicator = () => {
        return (
            <View style={styles.dotsContainer}>
                {carouselData.map((dot, index) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: index === activeIndex ? 'gray' : 'white' },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    const handlePageChange = (event) => {
        const offset = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offset / screenWidth);
        setActiveIndex(currentIndex);
    };

    return (
        <View>
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageChange}
            />
            {renderDotsIndicator()}
        </View>
    );
};

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 34, // Adjust the bottom spacing as needed
        width: '100%',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default Carousel;
