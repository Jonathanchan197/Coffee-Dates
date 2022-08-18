import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import userEvent from "@testing-library/user-event";

const MentorNotification = () => {
    const auth = useAuth();
    const [mentees, setMentees] = useState ([]);

    useEffect(() => {
        const fetchMentor = async () => {
          const { data } = await supabase.from("mentors").select('mentees').match({id: auth.user.id});
            data[0].mentees.map((user_id) => fetchMentee(user_id))
            setMentees (...mentees, data)
            console.log(mentees)
          if (!data) {
            alert("no mentors found!");
            return;
          }
        };
        fetchMentor();
      }, []);

    const fetchMentee = async (e) => {
        const {data} = await supabase.from("mentees").select().match({id: e})
        console.log(data)
    }

    return (
        <div>
            test
            {/* <div className="notification_container">
                {mentees.map((user) => 
                    <div className="mentee">
                        <h2 key={user}>{user}</h2>
                    </div>
                )} 
            </div> */}
        </div>
    )
}

export default MentorNotification;