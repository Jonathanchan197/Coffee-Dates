import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabase";
import "./Chats.css";

const Chats = () => {
  const auth = useAuth();
  const [isMentor, setIsMentor] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [participants, setParcipants] = useState([]);

  const checkMentor = async () => {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setIsMentor(response.data[0].mentor);
    }
  };

  const fetchRooms = async () => {
    if (isMentor) {
      const { data } = await supabase
        .from("rooms")
        .select()
        .match({ mentor_participant: auth.user.id });
      setRooms(data);
      if (!data) {
        alert("no chats found!");
        return;
      }
    } else {
      const { data } = await supabase
        .from("rooms")
        .select()
        .match({ mentee_participant: auth.user.id });
      setRooms(data);
      if (!data) {
        alert("no chats found!");
        return;
      }
    }
  };
  useEffect(() => {
    checkMentor();
    fetchRooms();
  }, [isMentor]);

  return (
    <div class="chats_container">
        {rooms.map((chat) => 
            <div key={chat.id} class="chat">adda</div>
        )}
    </div>
    )
};
export default Chats;
