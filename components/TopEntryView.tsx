import {Text, TouchableOpacity, View} from 'react-native';
import {formatTime} from './EntryView';
import {Entry} from '../data/db';
import React from 'react';

function TopEntryView({W, entry, color, filterByColor}:
  {W: number, entry: Entry | null, color: number, filterByColor: Function}): React.JSX.Element {
    const timeStr = (entry != null) ? formatTime(entry.time) : 'никогда';
    return <TouchableOpacity onPress={ () => { filterByColor(color); } }>
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
