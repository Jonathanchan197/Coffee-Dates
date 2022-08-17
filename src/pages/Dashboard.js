import { useState, useEffect } from "react";
import { useAuth } from '../auth'
import { supabase } from "../supabase";
import Clock from '../dashboard_tools/Clock';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Todo from "../dashboard_tools/Todo";


const Dashboard = () => {
  const [name, setName] = useState("");

  const auth = useAuth();

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
      < Clock />
      < Calendar />
      < Todo />
      {/* <h2> Connections </h2> TODO: connect with supabase count howmany connections */}

    </div>
  );
};

export default Dashboard;
