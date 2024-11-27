import {Dimensions, FlatList, View} from 'react-native';
import {Entry} from '../data/db';
import React, {useState} from 'react';
import TopEntryView from './TopEntryView';

function TopEntryList({entries, filterByColor, deleteByColor}:
    {entries: Entry[], filterByColor: Function, deleteByColor: Function}): React.JSX.Element {
    const [W, setW] = useState(Dimensions.get('window').width);
    const [isPortrait, setIsPortrait] =
        useState(Dimensions.get('window').width < Dimensions.get('window').height);
    const updateDimensions = () => {
      setW(Dimensions.get('window').width);
      setIsPortrait(Dimensions.get('window').width < Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateDimensions);

    const colors = [...Array(6).keys()];
    const topEntries = colors
        .map((color) => {
            const first = entries.find((value) => { return value.color === color; });
            return first !== undefined ? first : null;
        });
    const colorPairs = colors.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]);

    const hCoeff = isPortrait ? 1.0 : 0.2;
    return <FlatList
      style={{ height: W * 0.6 * hCoeff }}
      data={colorPairs}
      renderItem={({item}) => (
              <View style={{ flexDirection: 'row' }}>
                  <TopEntryView W={W} isPortrait={isPortrait} color={item[0]} entry={topEntries[item[0]]}
                                filterByColor={filterByColor} deleteByColor={deleteByColor} />
                  <TopEntryView W={W} isPortrait={isPortrait} color={item[1]} entry={topEntries[item[1]]}
                                filterByColor={filterByColor} deleteByColor={deleteByColor} />
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

export default TopEntryList;
