import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function PlaceholderMap({ latitude, longitude }) {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.coordinateText}>
        {latitude ? `Latitude: ${latitude.toFixed(4)}` : 'No Latitude'}
      </Text>
      <Text style={styles.coordinateText}>
        {longitude ? `Longitude: ${longitude.toFixed(4)}` : 'No Longitude'}
      </Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>
          Location Visualization
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: COLORS.ACCENT_BLUE,
    padding: 15,
    borderRadius: 10,
    margin: 10
  },
  coordinateText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    marginBottom: 5
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: COLORS.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  placeholderText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18
  }
});