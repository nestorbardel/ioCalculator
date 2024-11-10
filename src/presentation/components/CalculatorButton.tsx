import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../../config/theme/app-theme';

interface Props{
    
}

export const CalculatorButton = () => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>1</Text>
    </Pressable>
  );
};
