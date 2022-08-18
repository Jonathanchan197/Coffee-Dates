import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import userEvent from "@testing-library/user-event";

const MentorNotification = () => {
  const auth = useAuth();
  const [mentees, setMentees] = useState([]);
  let menteeList = [];

  const fetchMenteeIds = async () => {
    const { data } = await supabase
      .from("mentors")
      .select("mentees")
      .match({ id: auth.user.id });

    if (data) {
      console.log("MENTEE IDs:", data[0].mentees);
      data[0].mentees.forEach((uid) => fetchMentees(uid));
    }
  };

  const fetchMentees = async (uid) => {
    const response = await supabase.from("mentees").select().match({ id: uid });

    if (response) {
      console.log("RESPONSE:", response.data);
      // menteeList.push(response.data[0]);
      // console.log("MENTEES:", menteeList);
      menteeList = [...menteeList, response.data[0]];
      setMentees(menteeList);
    }
  };

  useEffect(() => {
    fetchMenteeIds();
  }, []);

  return (
    <div>
      <h1>Mentor Notifications</h1>
      {console.log("MENTEES:", mentees)}
      <div className="notification_container">
        <ul>
          {mentees.map((user) => (
            <>
              {console.log(`USER ${user.name}:`, user)}
              <li key={user.id}>{user.name}</li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentorNotification;
