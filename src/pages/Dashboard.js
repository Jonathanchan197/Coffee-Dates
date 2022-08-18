import { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabase";
import Clock from "../dashboard_tools/Clock";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
    <div className="dashboard">
      <div>
        <h1 className="dashboardtitle"> Welcome back {name}!</h1>
      </div>
      <div>
        <Clock />
      </div>
      <div>
        <Calendar />
      </div>
      <div>
        <Todo />
      </div>
    </div>
  );
};

export default Dashboard;
