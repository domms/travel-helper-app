import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const getWifiSpots = functions.https.onRequest((req, res) => {
  const spots = [
    {
      id: 'wifi_001',
      name: 'Remote Roasters',
      address: '123 Nomad Blvd, Bali',
      wifi_speed: '45 Mbps',
      outlets_available: true,
      rating: 4.7,
      lat: -8.409518,
      lng: 115.188919
    },
    {
      id: 'wifi_002',
      name: 'WorkBrew',
      address: '5 Remote Row, Mexico City',
      wifi_speed: '58 Mbps',
      outlets_available: false,
      rating: 4.4,
      lat: -18.409518,
      lng: 215.188919
    },
  ];

  res.json(spots);
});

