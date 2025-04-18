import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
import { getWifiSpotIcon } from '../utils/getWifiSpotIcon';
import { useUserLocation } from '../hooks/useUserLocation';
import MapMarkerIcon from '../components/MapMarkerIcon';
import { fetchWifiSpots } from '../services/overpass';
import { Ionicons } from '@expo/vector-icons';

interface WifiSpot {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address: string;
  tags?: Record<string, string>;
  distance?: number; // ← added at runtime
}

export default function WifiFinderMapScreen() {
  const { location, error } = useUserLocation();
  const [spots, setSpots] = useState<WifiSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!location) return;

    (async () => {
      const results = await fetchWifiSpots(
        location.coords.latitude,
        location.coords.longitude,
        5000,
      );

      // add distance & sort
      const withDistance = results
        .map((s: { lat: any; lon: any }) => ({
          ...s,
          distance: getDistance(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            { latitude: s.lat, longitude: s.lon },
          ),
        }))
        .sort(
          (a: { distance: any }, b: { distance: any }) =>
            (a.distance ?? 0) - (b.distance ?? 0),
        );

      setSpots(withDistance);
      setLoading(false);
    })();
  }, [location]);

  const openNativeNavigation = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lon}`,
      android: `google.navigation:q=${lat},${lon}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    })!;
    Linking.openURL(url);
  };

  // --- render ---
  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );

  if (loading || !location)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );

  const renderItem = ({ item }: { item: WifiSpot }) => {
    const distanceLabel =
      item.distance! < 1000
        ? `${item.distance} m`
        : `${(item.distance! / 1000).toFixed(1)} km`;

    return (
      <View style={styles.rowContainer}>
        {/* ───────── Row tap: centre map ───────── */}
        <TouchableOpacity
          style={styles.rowLeft}
          activeOpacity={0.7}
          onPress={() =>
            mapRef.current?.animateToRegion(
              {
                latitude: item.lat,
                longitude: item.lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              500,
            )
          }
        >
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.rowSub} numberOfLines={1}>
            {distanceLabel} • {item.address}
          </Text>
        </TouchableOpacity>

        {/* ───────── Navigate icon ───────── */}
        <TouchableOpacity
          onPress={() => openNativeNavigation(item.lat, item.lon)}
          style={styles.navButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="navigate" size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {spots.map((spot) => {
          /* ---------- category helpers ---------- */
          const amenity =
            spot.tags?.amenity === 'cafe'
              ? 'Café'
              : spot.tags?.amenity === 'restaurant'
                ? 'Restaurant'
                : spot.tags?.amenity === 'fast_food'
                  ? 'Fast Food'
                  : spot.tags?.amenity === 'library'
                    ? 'Library'
                    : 'Wi‑Fi Spot';

          const icon = getWifiSpotIcon(spot.tags);
          const backgroundColor =
            spot.tags?.amenity === 'cafe'
              ? '#3B82F6'
              : spot.tags?.amenity === 'fast_food'
                ? '#EF4444'
                : spot.tags?.amenity === 'restaurant'
                  ? '#EF4444'
                  : spot.tags?.amenity === 'library'
                    ? '#10B981'
                    : '#6B7280';

          /* ---------- marker ---------- */
          return (
            <Marker
              key={spot.id}
              coordinate={{ latitude: spot.lat, longitude: spot.lon }}
              title={`📍${spot.name}`}
              description={`${amenity} • ${spot.address} ➜`}
              onCalloutPress={() => openNativeNavigation(spot.lat, spot.lon)}
            >
              <MapMarkerIcon
                name={icon.name}
                library={icon.library}
                backgroundColor={backgroundColor}
              />
            </Marker>
          );
        })}
      </MapView>

      {/* bottom list */}
      <View
        style={[
          styles.sheet,
          { height: expanded ? '70%' : '45%' }, // toggle height
        ]}
      >
        {/* handle bar */}
        <View style={{ alignItems: 'center', paddingVertical: 4 }}>
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#D1D5DB',
              transform: [{ rotate: expanded ? '180deg' : '0deg' }],
            }}
          />
        </View>

        {/* nearby‑spots list */}
        <FlatList
          data={spots}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 4 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  row: { paddingVertical: 6 },
  rowTitle: { fontWeight: '600', fontSize: 14 },
  rowSub: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  sep: { height: 1, backgroundColor: '#E5E7EB' },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rowLeft: {
    flex: 1,
  },
  navButton: {
    marginLeft: 8,
  },
});
