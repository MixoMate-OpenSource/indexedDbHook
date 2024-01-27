## Example Using IndexedDb in React/NextJS project

```tsx
// add this line at top of the file
"use client"
// ... rest of your imports
// import useIndexDB hook from src folder
import useIndexedDB, { Tables } from "@/useIndexedDb";
```
where `Tables` is an enum for available tables declared in `@/useIndexedDB.ts`.


```ts
// useIndexedDB.ts
// ...
export const enum Tables  {
  TODO="TODO",
  BLOG="BLOG",
  ...
}
// ...
```

`useIndexedDB` is a hook that returns crud functions `addData`,`getAllData`,`updateData`,`deleteData` below is the example use case in a component:

```tsx

const Todo: React.FC = () => {
    const { addData, getAllData, updateData, deleteData } = useIndexedDB(Tables.TODO); // select todo table 
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
  return (<>
    // use `data` in your component
  </>) 
}
```
  
