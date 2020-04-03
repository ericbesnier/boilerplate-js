import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

const LoadingScreen = (props) => {
  // console.log('LoadingScreen');

  const size = props.size || 'large';
  const color = props.color || 'gray';
  const message = props.message || '';
  return (
    < View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }} >
      <ActivityIndicator
        size={size}
        color={color}
      />
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      }}>Veuillez attendre, svp...</Text>
      <Text style={{
        fontSize: 14,
        marginTop: 5
      }}>{message}</Text>
    </View >
  );
};

export default LoadingScreen;
