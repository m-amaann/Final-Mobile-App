import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');


const bannerImages = [
  require('../../../assets/cover/Cover-home.png'),
  require('../../../assets/cover/Cover-home-2.png'),
  require('../../../assets/cover/Cover-home-3.png'),
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  let carouselTimer;

  useEffect(() => {
    startAutoCarousel();
    return () => {
      stopAutoCarousel();
    };
  }, []);

  const startAutoCarousel = () => {
    carouselTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 2000);
  };

  const stopAutoCarousel = () => {
    clearInterval(carouselTimer);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={bannerImages}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideWidth = width;
          const index = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
          setCurrentIndex(index);
        }}
      />

        <View style={styles.pagination}>
            {bannerImages.map((image, index) => (
            <View
                key={index}
                style={[
                styles.paginationDot,
                { opacity: index === currentIndex ? 1 : 0.3 },
                ]}
            />
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, 
    backgroundColor: 'transparent',
    marginHorizontal: 10, 
  },
  slide: {
    width: 380,
    height: 166,
    margin: 5,
    overflow: 'hidden',
    flex: 1, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    flexShrink: 0,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#f4f4f4', // Change the color as needed
  },
});

export default BannerCarousel;
