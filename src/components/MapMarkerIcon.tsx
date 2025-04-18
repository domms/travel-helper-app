import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

interface Props {
  name: string;
  library: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome';
  size?: number;
  color?: string; // icon color
  backgroundColor?: string; // background color
}

const MapMarkerIcon = ({
  name,
  library,
  size = 24,
  color = '#fff',
  backgroundColor = '#3B82F6',
}: Props) => {
  const iconSize = size * 0.9;

  return (
    <View
      style={{
        backgroundColor,
        padding: 8,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      }}
    >
      {library === 'Ionicons' && (
        <Ionicons name={name as any} size={iconSize} color={color} />
      )}
      {library === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={name as any}
          size={iconSize}
          color={color}
        />
      )}
      {library === 'FontAwesome' && (
        <FontAwesome name={name as any} size={iconSize} color={color} />
      )}
    </View>
  );
};

export default MapMarkerIcon;
