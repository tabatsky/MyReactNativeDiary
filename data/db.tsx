import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

export type Entry = {id: number, color: number, time: number};

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS entries(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        color INTEGER NOT NULL,
        time INTEGER NOT NULL
    );`;

  await db.executeSql(query);
};

export const getEntriesFromDb = async (db: SQLiteDatabase): Promise<Entry[]> => {
  try {
    const entries: Entry[] = [];
    const results = await db.executeSql(`SELECT id,color,time FROM entries ORDER BY time DESC`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        entries.push(result.rows.item(index))
      }
    });
    return entries;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const addEntryToDb = async (db: SQLiteDatabase, entry: Entry) => {
  const insertQuery =
    `INSERT OR REPLACE INTO entries(color,time) VALUES (${entry.color},${entry.time})`;

  return db.executeSql(insertQuery);
};

export const deleteEntryFromDb = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery =
    `DELETE FROM entries WHERE id=${id}`;

  return db.executeSql(deleteQuery);
};

export const deleteFromDbByColor = async (db: SQLiteDatabase, color: number) => {
  const deleteQuery =
    `DELETE FROM entries WHERE color=${color}`;

  return db.executeSql(deleteQuery);
};
