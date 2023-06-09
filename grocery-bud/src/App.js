import { useState } from "react";
import { Form } from "./components/Form";
import { nanoid } from "nanoid";
import { ItemList } from "./components/ItemList";
import {ToastContainer, toast} from "react-toastify";


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = [];
  }
  return list;
  // console.log(list)
};
const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};
const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

function App() {
  const [items, setItems] = useState(defaultList);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Item added to the list")
  };

  const removeItem = (itemId) => {
    const newItemsArray = items.filter((x) => x.id !== itemId);
    setItems(newItemsArray);
    setLocalStorage(newItemsArray);
    toast.success("Item removed from the list")
  };

  const editItem = (itemId) => {
    const newArray = items.map((x) => {
      if (x.id == itemId) {
        const newItem = { ...x, completed: !x.isCompleted };
        return newItem;
      }
      return x;
    });
    setItems(newArray);
    setLocalStorage(newArray);
  };
  return (
    <section className="container">
      <ToastContainer position="top-center"/>
      <Form addItem={addItem} />
      <ItemList items={items} removeItem={removeItem}  editItem={editItem}/>
    </section>
  );
}

export default App;
