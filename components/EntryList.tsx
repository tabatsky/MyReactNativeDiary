import { FlatList, Dimensions, View } from 'react-native';
import { Entry } from '../data/db';
import EntryView from './EntryView';
import React, { useState } from 'react';

function EntryList({entries, deleteEntry}: {entries: Entry[], deleteEntry: Function}): React.JSX.Element {
    const [W, setW] = useState(Dimensions.get('window').width);
    const updateW = () => {
      setW(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateW);

    const pairs = entries.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]);
    return <FlatList
      style={{ height: '100%' }}
      data={pairs}
      renderItem={({item}) => {
        return item.length === 2 ?
        <View style={{ flexDirection: 'row' }}>
          <EntryView W={W} entry={item[0]} deleteEntry={deleteEntry} />
          <EntryView W={W} entry={item[1]} deleteEntry={deleteEntry} />
        </View> :
        <View style={{ flexDirection: 'row' }}>
          <EntryView W={W} entry={item[0]} deleteEntry={deleteEntry} />
        </View>;
      }}
      keyExtractor={item => {
        const id1 = item[0].id;
        const id2 = item[1] !== undefined ? item[1].id : 0;
        return (id1 * 1000 + id2).toString();
      }
    }
    />;
  }

  export default EntryList;
