
// import React from 'react';
// import { 
//   View, 
//   Image, 
//   Text, 
//   StyleSheet,
//   Dimensions 
// } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';
// import { COLORS } from '../theme/colors';
// import PlaceholderMap from '../components/MapComponent';
// import LocationMarker from '../components/LocationMarker';

// const { width, height } = Dimensions.get('window');

// export default function ImageDetailScreen({ route }) {
//   const { image } = route.params;

//   function LocationDisplay({ latitude, longitude }) {
//     return (
//       <View style={styles.locationContainer}>
//         <Text style={styles.locationText}>
//           {latitude && longitude 
//             ? `Location: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E` 
//             : 'Location Not Available'}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image 
//         source={{ uri: image.uri }} 
//         style={styles.fullScreenImage}
//         resizeMode="contain"
//       />
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
//         latitude={image.latitude} 
//         longitude={image.longitude} 
//       />
          
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND_DARK
//   },
//   fullScreenImage: {
//     width: width,
//     height: height * 0.6
//   },
//   detailsContainer: {
//     padding: 15,
//     backgroundColor: COLORS.ACCENT_BLUE
//   },
//   locationText: {
//     color: COLORS.TEXT_WHITE,
//     fontSize: 16
//   },
//   timestampText: {
//     color: COLORS.TEXT_LIGHT_BLUE,
//     fontSize: 14,
//     marginTop: 5
//   },
//   map: {
//     width: width,
//     height: height * 0.3
//   }
// });

import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import PlaceholderMap from '../components/MapComponent';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function ImageDetailScreen({ route }) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image 
        source={{ uri: image.uri }} 
        style={styles.fullScreenImage}
        resizeMode="contain"
      />

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
