import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Entry } from '../data/db';
import React from 'react';

function EntryView({W, isPortrait, entry, deleteEntry}: {W: number, isPortrait: boolean, entry: Entry, deleteEntry: Function}): React.JSX.Element {
    const hCoeff = isPortrait ? 1.0 : 0.2;
    return <TouchableOpacity onLongPress={ () => {
        Alert.alert('Вы уверены?', 'Запись будет удалена', [
            {
              text: 'Отмена',
              style: 'cancel',
            },
            {text: 'Да', onPress: () => deleteEntry(entry.id)},
        ]);
      } }>
      <View
        style = {{
          width: W * 0.46,
          height: W * 0.15 * hCoeff,
          marginLeft: W * 0.02,
          marginRight: W * 0.02,
          marginTop: W * 0.02 * hCoeff,
          marginBottom: W * 0.02 * hCoeff,
          backgroundColor: `hsl(${entry.color * 60}, 100%, 50%)`,
          justifyContent: 'center',
        }}
        ><Text>{formatTime(entry.time)}</Text></View>
    </TouchableOpacity>;
}

export function formatTime(time: number): string {
  const dt = Date.now() - time;
  const secTotal = Math.floor(dt / 1000);
  const sec = secTotal % 60;
  const minTotal = Math.floor(secTotal / 60);
  const min = minTotal % 60;
  const hoursTotal = Math.floor(minTotal / 60);
  const hours = hoursTotal % 24;
  const days = Math.floor(hoursTotal / 24);
  if (days > 0) {
    return `${days} д. ${hours} ч. назад`;
  }
  if (hours > 0) {
    return `${hours} ч. ${min} м. назад`;
  }
  return `${min} м. ${sec} с. назад`;
}

export default EntryView;
