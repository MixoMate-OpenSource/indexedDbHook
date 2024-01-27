import { useEffect, useState } from "react";
import { openDB } from "idb";

const db = "db_name";

export const Tables = {
  TODO: "TODO",
  BLOG: "BLOG",
  // ...
};

// Define your CRUD functions
const useIndexedDB = (tableName) => {
  const [dbInstance, setDbInstance] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const database = await openDB("mixomate", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(tableName)) {
            const store = db.createObjectStore(tableName, {
              keyPath: "key",
              autoIncrement: true,
            });
          }
        },
      });

      setDbInstance(database);
    };

    initDB();
  }, [tableName]);

  const addData = async (data) => {
    if (dbInstance) {
      const tx = dbInstance.transaction(tableName, "readwrite");
      const store = tx.objectStore(tableName);
      await store.add(data);
      await tx.done;
    }
  };

  const getAllData = async () => {
    if (dbInstance) {
      const tx = dbInstance.transaction(tableName, "readonly");
      const store = tx.objectStore(tableName);
      const data = await store.getAll();
      await tx.done;
      return data;
    }
    return [];
  };

  const updateData = async (newData) => {
    if (dbInstance) {
      const tx = dbInstance.transaction(tableName, "readwrite");
      const store = tx.objectStore(tableName);
      await store.put(newData);
      await tx.done;
    }
  };

  const deleteData = async (key) => {
    if (dbInstance) {
      const tx = dbInstance.transaction(tableName, "readwrite");
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
