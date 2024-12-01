

// import React from 'react';
// import { 
//   View, 
//   Image, 
//   Text, 
//   StyleSheet,
//   Dimensions 
// } from 'react-native';
// import PlaceholderMap from '../components/MapComponent';
// import { COLORS } from '../theme/colors';

// const { width, height } = Dimensions.get('window');

// export default function ImageDetailScreen({ route }) {
//   const { image } = route.params;

//   return (
//     <View style={styles.container}>
//       {/* Display the image */}
//       <Image 
//         source={{ uri: image.uri }} 
//         style={styles.fullScreenImage}
//         resizeMode="contain"
//       />

//       {/* Image details: location and timestamp */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.locationText}>
//           Location: 
//           {image.latitude && image.longitude 
//             ? `${image.latitude.toFixed(4)}, ${image.longitude.toFixed(4)}` 
//             : ' Not Available'}
//         </Text>
//         <Text style={styles.timestampText}>
//           Taken on: {new Date(image.timestamp).toLocaleString()}
//         </Text>
//       </View>

      
//       {image.latitude && image.longitude && (
//         <PlaceholderMap 
//           latitude={image.latitude} 
//           longitude={image.longitude} 
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND_DARK,
//   },
//   fullScreenImage: {
//     width: width,
//     height: height * 0.6,
//   },
//   detailsContainer: {
//     padding: 15,
//     backgroundColor: COLORS.ACCENT_BLUE,
//   },
//   locationText: {
//     color: COLORS.TEXT_WHITE,
//     fontSize: 16,
//   },
//   timestampText: {
//     color: COLORS.TEXT_LIGHT_BLUE,
//     fontSize: 14,
//     marginTop: 5,
//   },
// });


import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlaceholderMap from '../components/MapComponent';
import { COLORS } from '../theme/colors';
import { deleteImage} from '../utils/database'; // Import the deleteImage function

const { width, height } = Dimensions.get('window');

export default function ImageDetailScreen({ route }) {
  const { image } = route.params;
  const navigation = useNavigation();

  const handleDeleteImage = async () => {
    // Show a confirmation dialog before deletion
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call the deleteImage function with the image's ID
              const deleted = await deleteImage(image.id);
              
              if (deleted) {
                // Show success message and navigate back to the previous screen
                Alert.alert(
                  'Success', 
                  'Image deleted successfully',
                  [{
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }]
                );
              } else {
                // Handle case where deletion might have failed
                Alert.alert('Error', 'Could not delete the image');
              }
            } catch (error) {
              console.error('Error deleting image:', error);
              Alert.alert('Error', 'Failed to delete image');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image 
        source={{ uri: image.uri }} 
        style={styles.fullScreenImage}
        resizeMode="contain"
      />

      {/* Delete Button */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDeleteImage}
      >
        <Text style={styles.deleteButtonText}>🗑️ Delete Image</Text>
      </TouchableOpacity>

      {/* Image details: location and timestamp */}
      <View style={styles.detailsContainer}>
        <Text style={styles.locationText}>
          Location: 
          {image.latitude && image.longitude 
            ? `${image.latitude.toFixed(4)}, ${image.longitude.toFixed(4)}` 
            : ' Not Available'}
        </Text>
        <Text style={styles.timestampText}>
          Taken on: {new Date(image.timestamp).toLocaleString()}
        </Text>
      </View>
      
      {image.latitude && image.longitude && (
        <PlaceholderMap 
          latitude={image.latitude} 
          longitude={image.longitude} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  fullScreenImage: {
    width: width,
    height: height * 0.6,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.ACCENT_RED, // Assume you have a red color in your theme
    padding: 10,
    borderRadius: 5,
    zIndex: 10, // Ensure the button is above the image
  },
  deleteButtonText: {
    color: COLORS.TEXT_WHITE,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: COLORS.ACCENT_BLUE,
  },
  locationText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
  },
  timestampText: {
    color: COLORS.TEXT_LIGHT_BLUE,
    fontSize: 14,
    marginTop: 5,
  },
});