import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {formatTime} from './EntryView';
import {Entry} from '../data/db';
import React from 'react';

function TopEntryView({W, entry, color, filterByColor, deleteByColor}:
  {W: number, entry: Entry | null, color: number, filterByColor: Function, deleteByColor: Function}): React.JSX.Element {
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
          height: W * 0.15,
          margin: W * 0.02,
          backgroundColor: `hsl(${color * 60}, 100%, 50%)`,
          justifyContent: 'center',
        }}
        ><Text>{timeStr}</Text></View>
    </TouchableOpacity>;
}

export default TopEntryView;
