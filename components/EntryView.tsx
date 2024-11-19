import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { Entry } from '../data/db'

function EntryView({W, entry, deleteEntry}: {W: number, entry: Entry, deleteEntry: Function}): React.JSX.Element {
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
          height: W * 0.15,
          margin: W * 0.02,
          backgroundColor: `hsl(${entry.color * 60}, 100%, 50%)`,
          justifyContent: 'center',
        }}
        ><Text>{formatTime(entry.time)}</Text></View>
    </TouchableOpacity>
}

function formatTime(time: number): string {
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