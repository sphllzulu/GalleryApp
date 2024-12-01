
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';



export const requestCameraPermissions = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

export const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};


export const getCurrentLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
  } catch (error) {
    console.error('Location error:', error);
    return null;
  }
};



// export const getLocationName = async (latitude, longitude) => {
//   try {
//     const [locationInfo] = await Location.reverseGeocodeAsync({
//       latitude,
//       longitude
//     });

//     // Construct a readable location string
//     const locationName = locationInfo 
//       ? `${locationInfo.city}, ${locationInfo.country}` 
//       : 'Unknown Location';

//     return locationName;
//   } catch (error) {
//     console.error('Error getting location name:', error);
//     return 'Unknown Location';
//   }
// };