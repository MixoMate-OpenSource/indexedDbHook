"use client"
import React, { useEffect, useState } from "react";
import useIndexedDB, { Tables } from "@/useIndexedDb"; // change import path to useIndexedDb

const Todo: React.FC = () => {
  const { addData, getAllData, updateData, deleteData } = useIndexedDB(Tables.TODO);
  const [data, setData] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    (async () => {
      const newData = await getAllData();
      setData(newData);
    })();
    return ()=>{
    }
  }, [getAllData]);
  
  const fetchData = async () => {
    const newData = await getAllData();
    setData(newData);
  };

  const handleAdd = async () => {
    await addData({ key: newItem, value: newItem });
    fetchData();
  };

  const handleUpdate = async (key: string, newValue: string) => {
    await updateData({ key, value: newValue });
    fetchData();
  };

  const handleDelete = async (key: string) => {
    await deleteData(key);
    fetchData();
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.key}>
            {item.value}{" "}
            <button
              onClick={() =>
                handleUpdate(item.key, item.value)
              }
            >
              Update
            </button>{" "}
            <button onClick={() => handleDelete(item.key)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>
    </div>
  );
};

export default Todo;
