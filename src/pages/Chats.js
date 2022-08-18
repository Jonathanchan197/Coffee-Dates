import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import "./Chats.css";

const Chats = () => {
  const auth = useAuth();
  const [isMentor, setIsMentor] = useState(false);
  // const [rooms, setRooms] = useState([]);
  // const [participantIds, setParticipantIds] = useState([]);
  const [participants, setParticipants] = useState([]);
  let participantIdList = [];
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
      //setRooms(data);

      if (data) {
        data.forEach(room => fetchParticipants(room.id));
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
      //setRooms(data);

      if (data) {
        data.forEach(room => fetchParticipants(room.id));
      }

      if (!data) {
        alert("no chats found!");
        return;
      }
    }
  };

  const fetchParticipants = async (roomId) => {
    if (isMentor) {
      const response = await supabase.from("rooms").select().match({id: roomId, mentor_participant: auth.user.id});

      if (response) {
        console.log("RESPONSE:", response.data[0]);
        participantIdList = [...participantIdList, response.data[0].mentee_participant];
      }
    } else {
      const response = await supabase.from("rooms").select().match({id: roomId, mentee_participant: auth.user.id});

      if (response) {
        console.log("RESPONSE:", response.data[0]);
        participantIdList = [...participantIdList, response.data[0].mentor_participant];
      }
    }

    participantIdList.forEach(uid => fetchParticipantUsers(uid));
  };

  const fetchParticipantUsers = async (uid) => {
    const response = await supabase.from("users").select().match({id: uid});

    if (response) {
      console.log("RESPONSE NAME:", response.data[0].name);
      participantList = [...participantList, response.data[0]];
    }

    setParticipants(participantList);
  }

  useEffect(() => {
    checkMentor();
    fetchRooms();
  }, [isMentor]);

  return (
    <div class="chats_container">
      {console.log("PARTICIPANT LIST:", participants)}
      {participants.map((participant) => (
        <div key={participant.id} class="chat">
          Chat with {participant.name}
        </div>
      ))}

        {/* {rooms.map((chat) => 
        <ul>
            <li key={chat.id} class="chat">
                <Link className="links" to={`/chatroom/${chat.id}`}>
                    <p>{chat.id}</p>
                </Link>
            </li>
            </ul>
        )} */}
    </div>
  );
};
export default Chats;
