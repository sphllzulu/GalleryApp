// app/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../theme/colors';

import AuthScreen from '../AuthScreen';
import GalleryScreen from '../GalleryScreen';
import CameraScreen from '../CameraScreen';
import ImageDetailScreen from '../ImageDetailScreen';

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
          component={GalleryScreen} 
          options={{ title: 'My Gallery' }}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ title: 'Take Photo' }}
        />
        <Stack.Screen 
          name="ImageDetail" 
          component={ImageDetailScreen} 
          options={{ title: 'Image Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}