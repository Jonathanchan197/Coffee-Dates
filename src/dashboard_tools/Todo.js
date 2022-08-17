import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";

function Todo() {
  const auth = useAuth();
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [isMentor, setIsMentor] = useState(false);

  /******************************************** */
  async function fetchMentorOrMentee() {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setIsMentor(response.data[0].mentor);
    }
  }

  async function fetchInfo() {
    const tableName = isMentor ? "mentors" : "mentees";

    const response = await supabase
      .from(`${tableName}`)
      .select()
      .match({ id: auth.user.id });

    setItems(response.data[0].tasks);
    console.log(response.data[0].tasks)
  }

    //************************************************** */

    function addItem() {
      if (!newItem) { //If there is nothing will stop function and notify user
        alert("Please add something in!");
        return;
      }
      setItems([...items, newItem], newItem)
      console.log(items);
      setNewItem("");
    }

    async function updateInfo() {
    const tableName = isMentor ? "mentors" : "mentees";

    const { data, error } = await supabase.from(`${tableName}`).upsert({
      id: auth.user.id,
      tasks: items,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("Tasks has been updated! :D");
    }
  };
    //************************************************** */

  // function deleteItem(id) {
  //   const arr = items.filter(item => item.id !== id);
  //   setItems(arr);
  // }

  useEffect(() => {
    fetchMentorOrMentee();
    fetchInfo();
  }, [isMentor]);

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
      <button className="success" onClick={async() => {addItem()}}>Probs does something</button>
      <ul>
        {items.map((item) => {
          return (
            <li key={item}>
              {item}
              <span>  </span>
              {/* <button className="cross" onClick={() => deleteItem(item)}>❌</button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
