import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import "./Chats.css";

const Chats = () => {
  const auth = useAuth();
  const [isMentor, setIsMentor] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [participants, setParticipants] = useState([]);
  let participantList = [];

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

      if (data) {
        setRooms(data);
      }

      if (!data) {
        alert("no chats found!");
        return;
      }
    } else {
      const { data } = await supabase
        .from("rooms")
        .select()
        .match({ mentee_participant: auth.user.id });

      if (data) {
        setRooms(data);
      }

      if (!data) {
        alert("no chats found!");
        return;
      }
    }
  };

  const fetchParticipantIds = async () => {
    if (isMentor) {
      const { data } = await supabase.from("rooms").select("mentee_participant").match({mentor_participant: auth.user.id});

      if (data) {
        data.forEach((d) => fetchParticipants(d.mentee_participant));
      }
    } else {
      const { data } = await supabase.from("rooms").select("mentor_participant").match({mentee_participant: auth.user.id});

      if (data) {
        data.forEach((d) => fetchParticipants(d.mentor_participant));
      }
    }
  }

  const fetchParticipants = async (uid) => {
    let response;

    if (isMentor) {
      response = await supabase.from("mentees").select().match({ id: uid });
    } else {
      response = await supabase.from("mentors").select().match({ id: uid });
    }

    if (response) {
      console.log("RESPONSE:", response.data[0]);
      participantList = [...participantList, response.data[0]];
      setParticipants(participantList);
    }
  };

  useEffect(() => {
    checkMentor();
    fetchRooms();
    fetchParticipantIds();
  }, [isMentor]);

  return (
    <div class="chats_container">
      {participants.map((participant) => (
        <div key={participant.id} class="chat">
          {participant.name}
        </div>
      ))}

      {rooms.map((chat) => (
        <ul>
          <li key={chat.id} class="chat">
            <Link className="links" to={`/chatroom/${chat.id}`}>
              <p>{chat.id}</p>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};
export default Chats;
