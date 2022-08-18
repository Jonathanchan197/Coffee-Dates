import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

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
    }
  };

  const fetchParticipantIds = async () => {
    if (isMentor) {
      const { data } = await supabase
        .from("rooms")
        .select("mentee_participant")
        .match({ mentor_participant: auth.user.id });

      if (data) {
        data.forEach((d) => fetchParticipants(d.mentee_participant));
      }
    } else {
      const { data } = await supabase
        .from("rooms")
        .select("mentor_participant")
        .match({ mentee_participant: auth.user.id });

      if (data) {
        data.forEach((d) => fetchParticipants(d.mentor_participant));
      }
    }
  };

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
    <div class="chats">
      <h1 className="bounce" >Your Messages</h1>
      {participants.map((participant) => (
        <div key={participant.id} className="conversation">
          <div className="grouptitle">
          <img
            className="profilepic"
            src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${participant.avatar_url}`}
            alt={`${participant.name}'s Avatar`}
          />
          <h4 className="persontitle">{participant.name} - {participant.industry}</h4>
          </div>
        <div className="roombutton">
          {rooms.map((room) =>
            room.mentee_participant === participant.id ||
            room.mentor_participant === participant.id ? (
                <Link to={`/chatroom/${room.id}`}>
                  <button key={room.id} className="roomlink">
                    Chat
                  </button>
                </Link>
            ) : null
          )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Chats;
