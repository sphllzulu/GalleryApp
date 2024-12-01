
// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   StyleSheet,
//   Dimensions 
// } from 'react-native';
// import * as SecureStore from 'expo-secure-store';
// import { COLORS } from '../theme/colors';
// import { getUserImages } from '../utils/database';

// const { width } = Dimensions.get('window');
// const numColumns = 3;

// export default function GalleryScreen({ navigation }) {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const userId = await SecureStore.getItemAsync('user_id');
//         const userImages = await getUserImages(userId);
//         setImages(userImages);
//       } catch (error) {
//         console.error('Failed to load images', error);
//       }
//     };

//     loadImages();
//     const unsubscribe = navigation.addListener('focus', loadImages);
//     return unsubscribe;
//   }, [navigation]);

//   const renderImageGridItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.gridItem}
//       onPress={() => navigation.navigate('ImageDetail', { image: item })}
//     >
//       <Image 
//         source={{ uri: item.uri }} 
//         style={styles.image} 
//         resizeMode="cover"
//       />
//     </TouchableOpacity>
//   );

//   const navigateToCamera = () => {
//     navigation.navigate('Camera');
//   };

//   return (
//     <View style={styles.container}>
//       {images.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>No images yet</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={images}
//           renderItem={renderImageGridItem}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={numColumns}
//         />
//       )}
//       <TouchableOpacity 
//         style={styles.cameraButton} 
//         onPress={navigateToCamera}
//       >
//         <Text style={styles.cameraButtonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND_DARK
//   },
//   gridItem: {
//     flex: 1,
//     margin: 2,
//     aspectRatio: 1,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   emptyText: {
//     color: COLORS.TEXT_LIGHT_BLUE,
//     fontSize: 18
//   },
//   cameraButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: COLORS.PRIMARY_BLUE,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   cameraButtonText: {
//     color: COLORS.TEXT_WHITE,
//     fontSize: 30
//   }
// });


import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  TextInput 
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { COLORS } from '../theme/colors';
import { getUserImages } from '../utils/database';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const numColumns = 3;

export default function GalleryScreen({ navigation }) {
  // State for managing images and search
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load images when component mounts or navigates back
  useEffect(() => {
    const loadImages = async () => {
      try {
        const userId = await SecureStore.getItemAsync('user_id');
        const userImages = await getUserImages(userId);
        setImages(userImages);
        setFilteredImages(userImages); //show all images
      } catch (error) {
        console.error('Failed to load images', error);
      }
    };

    loadImages();
    const unsubscribe = navigation.addListener('focus', loadImages);
    return unsubscribe;
  }, [navigation]);

  // Search functionality 
  useEffect(() => {
    // Filter images based on location name (case-insensitive)
    if (searchQuery) {
      const filtered = images.filter(image => 
        image.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      // If search query is empty, show all images
      setFilteredImages(images);
    }
  }, [searchQuery, images]);



  
  // Render individual image grid item
  const renderImageGridItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={() => navigation.navigate('ImageDetail', { image: item })}
    >
      <Image 
        source={{ uri: item.uri }} 
        style={styles.image} 
        resizeMode="cover"
      />
      {/*  Show location name on image */}
      {item.location && (
        <View style={styles.locationOverlay}>
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Navigate to camera screen
  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={COLORS.TEXT_LIGHT_BLUE} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location"
          placeholderTextColor={COLORS.TEXT_LIGHT_BLUE}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={COLORS.TEXT_LIGHT_BLUE} 
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Image Grid or Empty State */}
      {filteredImages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery 
              ? `No images found for "${searchQuery}"` 
              : 'No images yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredImages}
          renderItem={renderImageGridItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
        />
      )}

      {/* Camera Button */}
      <TouchableOpacity 
        style={styles.cameraButton} 
        onPress={navigateToCamera}
      >
        <Text style={styles.cameraButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: COLORS.BACKGROUND_DARK
          },
          gridItem: {
            flex: 1,
            margin: 2,
            aspectRatio: 1,
          },
          image: {
            width: '100%',
            height: '100%',
          },
          emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          },
          emptyText: {
            color: COLORS.TEXT_LIGHT_BLUE,
            fontSize: 18
          },
          cameraButton: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.PRIMARY_BLUE,
            justifyContent: 'center',
            alignItems: 'center'
          },
          cameraButtonText: {
            color: COLORS.TEXT_WHITE,
            fontSize: 30
          },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_BLUE,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    color: COLORS.TEXT_WHITE,
    marginLeft: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
  },
  locationText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 10,
    textAlign: 'center',
  }
});