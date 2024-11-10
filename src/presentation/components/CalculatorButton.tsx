import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';

interface Props {
  label: string;
  color?: string;
}

export const CalculatorButton = ({label, color = colors.darkGray}: Props) => {
  return (
    <Pressable
      style={({pressed}) => ({
        ...styles.button,
        opacity: pressed ? 0.8 : 1,
        backgroundColor: color,
      })}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};
