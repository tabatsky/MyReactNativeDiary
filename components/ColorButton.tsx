import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

function ColorButton({color, A, isPortrait, addEntry}:
  {color: number, A: number, isPortrait: boolean, addEntry: Function}) : React.JSX.Element {
    const hCoeff = isPortrait ? 1.0 : 0.2;
    const margin = color < 5 ? A / 5 : 0;
    return <TouchableOpacity onPress={() => { addEntry(color); }}>
      <View
        style = {{
          width: A,
          height: A * hCoeff,
          marginEnd: margin,
          backgroundColor: `hsl(${color * 60}, 100%, 50%)`,
          justifyContent: 'center',
        }}
      >
        <Text style={{
          textAlign: 'center',
        }}>{color + 1}</Text>
      </View>
    </TouchableOpacity>;
  }

  export default ColorButton;
