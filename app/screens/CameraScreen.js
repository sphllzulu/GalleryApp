// import React, { useState } from 'react';
// import { 
//   View, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Alert,
//   Text
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as SecureStore from 'expo-secure-store';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { COLORS } from '../theme/colors';
// import { 
//   requestLocationPermissions, 
//   getLocationName,
//   getCurrentLocation 
// } from '../utils/permissions';
// import { saveImage } from '../utils/database';
// import { reverseGeocodeAsync } from 'expo-location';

// export default function CameraScreen({ navigation }) {
//   // Use the new useCameraPermissions hook
//   const [permission, requestPermission] = useCameraPermissions();
  
//   // Use 'back' or 'front' instead of Camera.Constants.Type
//   const [facing, setFacing] = useState('back');
  
//   // Use React.useRef for camera reference
//   const cameraRef = React.useRef(null);

//   // Permission handling
//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
//           <Text>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Toggle camera facing
//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   };

//   // Take picture
//   const takePicture = async () => {
//     try {
//       if (cameraRef.current) {
//         const photo = await cameraRef.current.takePictureAsync();
//         await processImage(photo.uri);
//       }
//     } catch (error) {
//       console.error('Failed to take picture:', error);
//       Alert.alert('Error', 'Failed to capture image');
//     }
//   };

//   // Select from gallery
//   const selectFromGallery = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         await processImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error('Failed to select image:', error);
//       Alert.alert('Error', 'Failed to select image');
//     }
//   };

//   // Process image (save to database)
//   const processImage = async (uri) => {
//     try {
//       const userId = await SecureStore.getItemAsync('user_id');
//       const location = await getCurrentLocation();

//       if (location) {
//         await saveImage(
//           userId, 
//           uri, 
//           location.latitude, 
//           location.longitude
//         );
//         navigation.goBack();
//       } else {
//         Alert.alert('Location Error', 'Could not retrieve location');
//       }
//     } catch (error) {
//       console.error('Failed to process image:', error);
//       Alert.alert('Error', 'Failed to save image');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView 
//         style={styles.camera} 
//         facing={facing}
//         ref={cameraRef}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.cameraButton}
//             onPress={takePicture}
//           />
//           <TouchableOpacity
//             style={styles.galleryButton}
//             onPress={selectFromGallery}
//           />
//           <TouchableOpacity
//             style={styles.flipButton}
//             onPress={toggleCameraFacing}
//           >
//             <Text style={styles.buttonText}>Flip</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND_DARK
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: 'transparent'
//   },
//   cameraButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.PRIMARY_BLUE,
//     marginHorizontal: 10
//   },
//   galleryButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.SECONDARY_BLUE,
//     marginHorizontal: 10
//   },
//   flipButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.ACCENT_COLOR,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 12
//   },
//   message: {
//     textAlign: 'center',
//     padding: 20
//   },
//   permissionButton: {
//     alignSelf: 'center',
//     backgroundColor: COLORS.PRIMARY_BLUE,
//     padding: 10,
//     borderRadius: 5
//   }
// });

// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Alert,
//   Text
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as SecureStore from 'expo-secure-store';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { MaterialIcons } from '@expo/vector-icons';
// import { COLORS } from '../theme/colors';
// import { 
//   requestLocationPermissions, 
//   getLocationName,
//   getCurrentLocation 
// } from '../utils/permissions';
// import { saveImage, saveVideo } from '../utils/database';
// import { reverseGeocodeAsync } from 'expo-location';

// export default function CameraScreen({ navigation }) {
//   // Use the new useCameraPermissions hook
//   const [permission, requestPermission] = useCameraPermissions();
  
//   // Use 'back' or 'front' instead of Camera.Constants.Type
//   const [facing, setFacing] = useState('back');
  
//   // Track camera mode (photo or video)
//   const [mode, setMode] = useState('photo');
  
//   // Track video recording status
//   const [isRecording, setIsRecording] = useState(false);
  
//   // Use React.useRef for camera reference
//   const cameraRef = useRef(null);

//   // Permission handling
//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
//           <Text>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Toggle camera facing
//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   };

//   // Switch between photo and video mode
//   const toggleCameraMode = () => {
//     setMode(current => (current === 'photo' ? 'video' : 'photo'));
//   };

//   // Take picture
//   const takePicture = async () => {
//     try {
//       if (cameraRef.current) {
//         const photo = await cameraRef.current.takePictureAsync();
//         await processImage(photo.uri);
//       }
//     } catch (error) {
//       console.error('Failed to take picture:', error);
//       Alert.alert('Error', 'Failed to capture image');
//     }
//   };

//   // Start/stop video recording
//   const toggleVideoRecording = async () => {
//     try {
//       if (cameraRef.current) {
//         if (isRecording) {
//           const video = await cameraRef.current.stopRecording();
//           await processVideo(video.uri);
//           setIsRecording(false);
//         } else {
//           // Use a simple configuration object without nested constants
//           const recordingOptions = {
//             maxDuration: 60,
//             videoBitrate: 1000000, // 1 Mbps
//             quality: 'high'
//           };

//           await cameraRef.current.recordAsync(recordingOptions);
//           setIsRecording(true);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to record video:', error);
//       Alert.alert('Error', 'Failed to record video');
//       setIsRecording(false);
//     }
//   };

//   const selectFromGallery = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: mode === 'photo' 
//           ? ImagePicker.MediaTypeOptions.Images 
//           : ImagePicker.MediaTypeOptions.Videos,
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const uri = result.assets[0].uri;
//         mode === 'photo' ? await processImage(uri) : await processVideo(uri);
//       }
//     } catch (error) {
//       console.error('Failed to select media:', error);
//       Alert.alert('Error', 'Failed to select media');
//     }
//   };

//   // Process image (save to database)
//   const processImage = async (uri) => {
//     try {
//       const userId = await SecureStore.getItemAsync('user_id');
//       const location = await getCurrentLocation();

//       if (location) {
//         await saveImage(
//           userId, 
//           uri, 
//           location.latitude, 
//           location.longitude
//         );
//         navigation.goBack();
//       } else {
//         Alert.alert('Location Error', 'Could not retrieve location');
//       }
//     } catch (error) {
//       console.error('Failed to process image:', error);
//       Alert.alert('Error', 'Failed to save image');
//     }
//   };

//   // Process video (save to database)
//   const processVideo = async (uri) => {
//     try {
//       const userId = await SecureStore.getItemAsync('user_id');
//       const location = await getCurrentLocation();

//       if (location) {
//         await saveVideo(
//           userId, 
//           uri, 
//           location.latitude, 
//           location.longitude
//         );
//         navigation.goBack();
//       } else {
//         Alert.alert('Location Error', 'Could not retrieve location');
//       }
//     } catch (error) {
//       console.error('Failed to process video:', error);
//       Alert.alert('Error', 'Failed to save video');
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <CameraView 
//         style={styles.camera} 
//         facing={facing}
//         ref={cameraRef}
//         mode={mode === 'photo' ? 'picture' : 'video'}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={mode === 'photo' ? takePicture : toggleVideoRecording}
//           >
//             <MaterialIcons 
//               name={mode === 'photo' 
//                 ? 'photo-camera' 
//                 : (isRecording ? 'stop' : 'videocam')
//               } 
//               size={30} 
//               color="white" 
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.galleryButton}
//             onPress={selectFromGallery}
//           >
//             <MaterialIcons name="photo-library" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.flipButton}
//             onPress={toggleCameraFacing}
//           >
//             <MaterialIcons name="flip-camera-ios" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.modeButton}
//             onPress={toggleCameraMode}
//           >
//             <MaterialIcons 
//               name={mode === 'photo' ? 'videocam' : 'photo-camera'} 
//               size={30} 
//               color="white" 
//             />
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND_DARK
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: 'transparent',
//     alignItems: 'center'
//   },
//   actionButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.PRIMARY_BLUE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10
//   },
//   galleryButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.SECONDARY_BLUE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10
//   },
//   flipButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.ACCENT_COLOR,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10
//   },
//   modeButton: {
//     width: 70,
//     height: 70,
//     bottom: 0,
//     borderRadius: 50,
//     backgroundColor: COLORS.SECONDARY_COLOR,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10
//   }
// });


import React, { useState, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { 
  getCurrentLocation 
} from '../utils/permissions';
import { saveImage } from '../utils/database';

export default function CameraScreen({ navigation }) {
  // Use the new useCameraPermissions hook
  const [permission, requestPermission] = useCameraPermissions();
  
  // Use 'back' or 'front' instead of Camera.Constants.Type
  const [facing, setFacing] = useState('back');
  
  // Use React.useRef for camera reference
  const cameraRef = useRef(null);

  // Permission handling
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Toggle camera facing
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Take picture
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        await processImage(photo.uri);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  // Select from gallery
  const selectFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to select image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Process image (save to database)
  const processImage = async (uri) => {
    try {
      const userId = await SecureStore.getItemAsync('user_id');
      const location = await getCurrentLocation();

      if (location) {
        await saveImage(
          userId, 
          uri, 
          location.latitude, 
          location.longitude
        );
        navigation.goBack();
      } else {
        Alert.alert('Location Error', 'Could not retrieve location');
      }
    } catch (error) {
      console.error('Failed to process image:', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
        mode="picture"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={takePicture}
          >
            <MaterialIcons 
              name="photo-camera" 
              size={30} 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={selectFromGallery}
          >
            <MaterialIcons name="photo-library" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  actionButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  galleryButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: COLORS.SECONDARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  flipButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: COLORS.ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  message: {
    textAlign: 'center',
    padding: 20
  },
  permissionButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY_BLUE,
    padding: 10,
    borderRadius: 5
  }
});