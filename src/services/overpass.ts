import { formatAddress } from '../utils/formatAddress'; // adjust path as needed

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

export async function fetchWifiSpots(
  lat: number,
  lon: number,
  radiusMeters: number = 10000,
) {
  const delta = radiusMeters / 111320; // ~111km per degree (rough approximation)
  const minLat = lat - delta;
  const maxLat = lat + delta;
  const minLon = lon - delta;
  const maxLon = lon + delta;

  const query = `
    [out:json];
    node[internet_access~"wlan|wifi"](${minLat},${minLon},${maxLat},${maxLon});
    out;
  `;

  const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const json = await response.json();

  return json.elements.map((node: any) => ({
    id: node.id.toString(),
    lat: node.lat,
    lon: node.lon,
    name: node.tags?.name || 'Unnamed Location',
    address: formatAddress(node.tags),
    tags: node.tags,
  }));
}
