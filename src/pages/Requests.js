import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import userEvent from "@testing-library/user-event";

const Requests = () => {
  const auth = useAuth();
  const [requests, setRequests] = useState([]);
  const [mentees, setMentees] = useState([]);
  let menteeList = [];

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("mentors")
      .select("requests")
      .match({ id: auth.user.id });

    if (data) {
      setRequests(data[0].requests);
      data[0].requests.forEach((uid) => fetchMentees(uid));
    }
  };

  const fetchMentees = async (uid) => {
    const response = await supabase.from("mentees").select().match({ id: uid });

    if (response) {
      menteeList = [...menteeList, response.data[0]];
      setMentees(menteeList);
    }
  };

  const handleAccept = async (uid) => {
    console.log("Accept ", uid);

    //CREATE CHATROOM
    const response = await supabase
      .from("rooms")
      .upsert({ mentee_participant: uid, mentor_participant: auth.user.id });
    if (response) {
      const { data } = await supabase.from("mentors").upsert({
        id: auth.user.id,
        requests: requests.filter((id) => id !== uid),
      });

      if (data) {
        console.log(`User ${uid} accepted.`);
        setRequests(requests.filter((id) => id !== uid));
        setMentees(mentees.filter((m) => m.id !== uid));
      }
    }
  };

  const handleRejection = async (uid) => {
    const response = await supabase.from("mentors").upsert({
      id: auth.user.id,
      requests: requests.filter((id) => id !== uid),
    });
    if (response) {
      console.log(`User ${uid} rejected.`);
      setRequests(requests.filter((id) => id !== uid));
      setMentees(mentees.filter((m) => m.id !== uid));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="request">
      <h1 className="title bounce">Requests</h1>
      <div className="notification_container">
        {mentees.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <ul>
            {mentees.map((user) => (
              <>
                {console.log(`USER ${user.name}:`, user)}
                <li key={user.id}>
                  <Link
                    to={`/profile/${user.id}`}
                  >
                    <img
                      className="pfp"
                      src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${user.avatar_url}`}
                      alt={`${user.name}'s Avatar`}
                    />
                  </Link>
                  <h2>{user.name}</h2>
                </li>
                <button
                  className="accept"
                  onClick={() => handleAccept(user.id)}
                >
                  Accept
                </button>
                <button
                  className="decline"
                  onClick={() => handleRejection(user.id)}
                >
                  Reject
                </button>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
