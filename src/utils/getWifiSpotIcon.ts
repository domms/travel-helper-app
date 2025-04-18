export function getWifiSpotIcon(tags: Record<string, any> | undefined): {
  name: string;
  library: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome';
} {
  if (!tags) return { name: 'wifi', library: 'Ionicons' };

  if (tags['amenity'] === 'cafe') {
    return { name: 'cafe-outline', library: 'Ionicons' };
  }

  if (tags['amenity'] === 'library') {
    return { name: 'library', library: 'Ionicons' };
  }

  if (tags['office'] === 'co_working') {
    return { name: 'briefcase-outline', library: 'Ionicons' };
  }

  if (tags['amenity'] === 'cafe') {
    return { name: 'cafe-outline', library: 'Ionicons' };
  }

  if (tags['amenity'] === 'fast_food') {
    return { name: 'food', library: 'MaterialCommunityIcons' };
  }

  if (tags['amenity'] === 'lounge') {
    return { name: 'couch', library: 'FontAwesome' };
  }

  return { name: 'wifi', library: 'Ionicons' };
}
