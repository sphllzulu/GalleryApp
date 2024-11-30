import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function LocationMarker({ latitude, longitude }) {
  return (
    <View style={styles.container}>
      <Svg 
        width="200" 
        height="200" 
        viewBox="0 0 100 100"
      >
        {/* Location Pin */}
        <Path
          d="M50 10 
             C30 30, 30 60, 50 80 
             C70 60, 70 30, 50 10 Z"
          fill={COLORS.PRIMARY_BLUE}
          stroke={COLORS.SECONDARY_BLUE}
          strokeWidth="2"
        />
        
        {/* Location Dot */}
        <Circle 
          cx="50" 
          cy="50" 
          r="10" 
          fill={COLORS.ACCENT_BLUE} 
        />
      </Svg>
      <View style={styles.coordinateContainer}>
        <Text style={styles.coordinateText}>
          Latitude: {latitude ? latitude.toFixed(4) : 'N/A'}
        </Text>
        <Text style={styles.coordinateText}>
          Longitude: {longitude ? longitude.toFixed(4) : 'N/A'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_DARK,
    padding: 15,
    borderRadius: 10
  },
  coordinateContainer: {
    marginTop: 10
  },
  coordinateText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    textAlign: 'center'
  }
});