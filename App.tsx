import React from 'react';
import { View, StatusBar } from 'react-native';

import HomeGeoLoc from './src/pages/HomeGeoLoc'
import Home from './src/pages/Home'

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#312783" translucent={false} />
      <Home />
    </View>
  );
}
