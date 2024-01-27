// LoadingIndicator.js
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicator = () => (
  <LoadingContainer>
    <ActivityIndicator size="large" color="#000" />
  </LoadingContainer>
);

export default LoadingIndicator;
