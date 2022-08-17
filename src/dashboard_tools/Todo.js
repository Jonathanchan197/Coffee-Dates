import { useState } from "react";

function Todo() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    if (!newItem) {
      alert("Please add something in!");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const arr = items.filter(item => item.id !== id);
    setItems(arr);
  }

  return (
    <div>
      <h1>Jot it down!</h1>
      <input
        className="textField"
        type="text"
        value={newItem}
        onChange={(e) => {
          setNewItem(e.target.value);
        }}
        placeholder="Type something..."
      />
      <button className="success" onClick={() => addItem()}>Probs does something</button>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.value}
              <span>  </span>
              <button className="cross" onClick={() => deleteItem(item.id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
