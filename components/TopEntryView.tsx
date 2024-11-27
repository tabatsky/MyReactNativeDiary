import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {formatTime} from './EntryView';
import {Entry} from '../data/db';
import React from 'react';

function TopEntryView({W, isPortrait, entry, color, filterByColor, deleteByColor}:
  {W: number, isPortrait: boolean, entry: Entry | null, color: number, filterByColor: Function, deleteByColor: Function}): React.JSX.Element {
    const hCoeff = isPortrait ? 1.0 : 0.2;
    const timeStr = (entry != null) ? formatTime(entry.time) : 'никогда';
    return <TouchableOpacity
        onPress={ () => { filterByColor(color); } }
        onLongPress={ () => {
          Alert.alert('Вы уверены?', 'Все записи этого типа будут удалены', [
              {
                text: 'Отмена',
                style: 'cancel',
              },
              {text: 'Да', onPress: () => deleteByColor(color)},
          ]);
        } }
      >
      <View
        style = {{
          width: W * 0.46,
          height: W * 0.15 * hCoeff,
          marginLeft: W * 0.02,
          marginRight: W * 0.02,
          marginTop: W * 0.02 * hCoeff,
          marginBottom: W * 0.02 * hCoeff,
          backgroundColor: `hsl(${color * 60}, 100%, 50%)`,
          justifyContent: 'center',
        }}
        ><Text>{timeStr}</Text></View>
    </TouchableOpacity>;
}

export default TopEntryView;
