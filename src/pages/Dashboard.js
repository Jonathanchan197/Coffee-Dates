import { useState, useEffect } from "react";
import { useAuth } from '../auth'
import { supabase } from "../supabase";

const Dashboard = () => {
  const [name, setName] = useState("");

  const auth = useAuth();

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await supabase
        .from("users")
        .select()
        .match({ id: auth.user.id });
      setName(response.data[0].name);
    };
    fetchInfo();
  }, []);

  return (
    <div>
      <h1 className="title"> Welcome back {name}!</h1>
      <h2>{day}/{month}/{year}</h2>
    </div>
  );
};

export default Dashboard;
