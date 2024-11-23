import {Dimensions, FlatList, View} from 'react-native';
import {Entry} from '../data/db';
import React, {useState} from 'react';
import TopEntryView from './TopEntryView';

function Header({entries}: {entries: Entry[]}): React.JSX.Element {
    const [W, setW] = useState(Dimensions.get('window').width);
    const updateW = () => {
      setW(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateW);

    const colors = [...Array(6).keys()];
    const topEntries = colors
        .map((color) => {
            const first = entries.find((value) => { return value.color === color; });
            return first !== undefined ? first : null;
        });
    const colorPairs = colors.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]);

    return <FlatList
      style={{ height: W * 0.6 }}
      data={colorPairs}
      renderItem={({item}) => (
              <View style={{ flexDirection: 'row' }}>
                  <TopEntryView W={W} color={item[0]} entry={topEntries[item[0]]} />
                  <TopEntryView W={W} color={item[1]} entry={topEntries[item[1]]} />
              </View>
          )}
      keyExtractor={item => {
        const id1 = item[0];
        const id2 = item[1];
        return (id1 * 1000 + id2).toString();
      }
     }
    />;
}

export default Header;