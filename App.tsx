/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import EntryList from './components/EntryList'
import ButtonPanel from './components/ButtonPanel';
import { addEntryToDb, createTable, deleteEntryFromDb, Entry, getDBConnection, getEntriesFromDb } from './data/db';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const [entries, setEntries] = React.useState<Entry[]>([]);

  const loadData = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const entries = await getEntriesFromDb(db);
      setEntries(entries);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDataCallback = useCallback(async () => {
    await loadData();
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const addEntry = async (color: number) => {
    const db = await getDBConnection();
    await addEntryToDb(db, {id: 0, color: color, time: Date.now()});
    await loadData();
  };

  const deleteEntry = async (id: number) => {
    const db = await getDBConnection();
    await deleteEntryFromDb(db, id);
    await loadData();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor='navy'
      />
      <View
        style = {styles.mainView}>
        <View style={styles.listView}>
          <EntryList entries={entries} deleteEntry={deleteEntry}/>
        </View>
        <ButtonPanel addEntry={addEntry} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    flexDirection: 'column'
  },
  listView: {
    flex: 1000
  }
});

export default App;
