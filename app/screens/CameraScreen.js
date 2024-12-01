

import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { COLORS } from '../theme/colors';
import { 
  requestLocationPermissions, 
  getLocationName,
  getCurrentLocation 
} from '../utils/permissions';
import { saveImage } from '../utils/database';

export default function CameraScreen({ navigation }) {
  // Use the new useCameraPermissions hook
  const [permission, requestPermission] = useCameraPermissions();
  
  // Use 'back' or 'front' instead of Camera.Constants.Type
  const [facing, setFacing] = useState('back');
  
  // Use React.useRef for camera reference
  const cameraRef = React.useRef(null);

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
        mediaTypes: ImagePicker.MediaType.Images,
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
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={takePicture}
          />
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={selectFromGallery}
          />
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.buttonText}>Flip</Text>
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
    backgroundColor: 'transparent'
  },
  cameraButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY_BLUE,
    marginHorizontal: 10
  },
  galleryButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: COLORS.SECONDARY_BLUE,
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
  buttonText: {
    color: 'white',
    fontSize: 12
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