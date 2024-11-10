import { Alert, Text, TouchableOpacity, View } from "react-native"
import { Entry } from "../data/db"

function EntryView({W, entry, deleteEntry}: {W: number, entry: Entry, deleteEntry: Function}): React.JSX.Element {
    const currentTime = Date.now();
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
        ><Text>{currentTime - entry.time}</Text></View>
    </TouchableOpacity>
}

export default EntryView;