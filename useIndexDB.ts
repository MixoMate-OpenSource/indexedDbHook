import { useEffect, useState } from "react";
import { openDB, DBSchema, IDBPDatabase } from "idb";

const db = "db_name" 

// define your tables
export const enum Tables  {
  TODO="TODO",
  BLOG="BLOG",
  // ...
}


// change DB_Schema to something you want to and define table sctructure
interface DB_Schema extends DBSchema {
  [Tables.TODO]: {
    key: string;
    value: any; // Adjust this based on your table structure
  };
  [Tables.BLOG]: {
    key: string;
    value: string; // Adjust this based on your table structure
    published: boolean;
  };
  // ...
}

// Pre Defined CRUD Functions
const useIndexedDB = (tableName: Tables) => {
  
  const [db, setDb] = useState<IDBPDatabase<DB_Schema> | null>(null);
  useEffect(() => {
    const initDB = async () => {
      console.log("meta", process.env.NODE_TEST);
      const database = await openDB<DB_Schema>(db, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(tableName)) {
            const store = db.createObjectStore(tableName, {
              keyPath: "key",
              autoIncrement: true,
            });
          }
        },
      });

      setDb(database);
    };

    initDB();
  }, [tableName]);

  const addData = async (data: any) => {
    if (db) {
      const tx = db.transaction(tableName, "readwrite");
      const store = tx.objectStore(tableName);
      await store.add(data);
      await tx.done;
    }
  };

  const getAllData = async () => {
    if (db) {
      const tx = db.transaction(tableName, "readonly");
      const store = tx.objectStore(tableName);
      const data = await store.getAll();
      await tx.done;
      return data;
    }
    return [];
  };

  const updateData = async (newData: any) => {
    if (db) {
      const tx = db.transaction(tableName, "readwrite");
      const store = tx.objectStore(tableName);
      await store.put(newData);
      await tx.done;
    }
  };

  const deleteData = async (key: string) => {
    if (db) {
      const tx = db.transaction(tableName, "readwrite");
      const store = tx.objectStore(tableName);
      await store.delete(key);
      await tx.done;
    }
  };

  return {
    addData,
    getAllData,
    updateData,
    deleteData,
  };
};

export default useIndexedDB;
