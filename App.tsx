/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import EntryList from './components/EntryList';
import ButtonPanel from './components/ButtonPanel';
import {
  addEntryToDb,
  createTable,
  deleteEntryFromDb,
  deleteFromDbByColor,
  Entry,
  getDBConnection,
  getEntriesFromDb,
} from './data/db';
import TopEntryList from './components/TopEntryList.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const [date, setDate] = useState(new Date());
  const [colorToUse, setColorToUse] = useState(-1);
  const [pickerOpened, setPickerOpened] = useState(false);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [colorFilter, setColorFilter] = useState(-1);
  const filterByColor = (color: number) => {
    if (colorFilter !== color) {
      setColorFilter(color);
    } else {
      setColorFilter(-1);
    }
  };
  const filteredEntries = entries.filter((value) =>  value.color === colorFilter || colorFilter === -1);

  const loadData = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const entriesFromDb = await getEntriesFromDb(db);
      setEntries(entriesFromDb);
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

  const addEntryWithDate = (color: number) => {
    setColorToUse(color);
    setDate(new Date());
    setPickerOpened(true);
  };

  const addEntryWithDateToDB = async (date: Date) => {
    const db = await getDBConnection();
    await addEntryToDb(db, {id: 0, color: colorToUse, time: date.getTime()});
    await loadData();
  }

  const deleteEntry = async (id: number) => {
    const db = await getDBConnection();
    await deleteEntryFromDb(db, id);
    await loadData();
  };

  const deleteByColor = async (color: number) => {
    const db = await getDBConnection();
    await deleteFromDbByColor(db, color);
    await loadData();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="navy"
      />
        <View
          style = {styles.mainView}>
          <DatePicker
            modal
            open={pickerOpened}
            date={date}
            mode='datetime'
            onConfirm={(date) => {
              setPickerOpened(false);
              addEntryWithDateToDB(date);
            }}
            onCancel={() => {
              setPickerOpened(false);
            }}
          />
        <TopEntryList entries={filteredEntries} filterByColor={filterByColor} deleteByColor={deleteByColor} />
        <View style={styles.listView}>
          <EntryList entries={filteredEntries} deleteEntry={deleteEntry} />
        </View>
        <ButtonPanel addEntry={addEntry} addEntryWithDate={addEntryWithDate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    flexDirection: 'column',
  },
  listView: {
    flex: 1000,
  },
});

export default App;
