import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../theme/colors';

import AuthScreen from '../screens/AuthScreen';
import GalleryScreen from '../screens/GalleryScreen';
import CameraScreen from '../screens/CameraScreen';
import ImageDetailScreen from '../screens/ImageDetailScreen';
import ProtectedRoute from '../components/ProtectedRoute';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { 
            backgroundColor: COLORS.BACKGROUND_DARK 
          },
          headerTintColor: COLORS.TEXT_WHITE,
          cardStyle: { 
            backgroundColor: COLORS.BACKGROUND_DARK 
          }
        }}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ title: 'Authentication' }}
        />
        <Stack.Screen 
          name="Gallery" 
          options={{ title: 'My Gallery' }}
        >
          {(props) => (
            <ProtectedRoute {...props}>
              <GalleryScreen {...props} />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="Camera" 
          options={{ title: 'Take Photo' }}
        >
          {(props) => (
            <ProtectedRoute {...props}>
              <CameraScreen {...props} />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="ImageDetail" 
          options={{ title: 'Image Details' }}
        >
          {(props) => (
            <ProtectedRoute {...props}>
              <ImageDetailScreen {...props} />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}