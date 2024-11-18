import { View, TouchableOpacity, Text } from "react-native";

function ColorButton({color, A, addEntry}: {color: number, A: number, addEntry: Function}) : React.JSX.Element {
    const margin = color < 5 ? A / 5 : 0;
    return <TouchableOpacity onPress={() => { addEntry(color); }}>
      <View 
        style = {{
          width: A,
          height: A,
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
  