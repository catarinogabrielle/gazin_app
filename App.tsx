import React from 'react';
import { View, StatusBar } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import Colors from './constants/Colors';
const ColorTheme = Colors['Theme'];

import Home from './src/pages/Home'

export default function App() {
  useKeepAwake()
  return (
    <View>
      <StatusBar backgroundColor={ColorTheme.Preto} translucent={false} />
      <Home />
    </View>
  );
}
