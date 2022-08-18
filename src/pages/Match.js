import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import TinderCard from "react-tinder-card";
import "./TinderCard.css";

const Match = () => {
  const [mentors, setMentors] = useState([]);
  const [industry, setIndustry] = useState("");
  const auth = useAuth();

  const fetchIndustry = async () => {
    const response = await supabase
      .from("mentees")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setIndustry(response.data[0].industry);
    }
  };

  const fetchMentors = async () => {
    const { data } = await supabase
      .from("mentors")
      .select()
      .match({ industry: industry });

    if (data) {
      setMentors(data);
    }

    if (!data) {
      alert("no mentors found!");
      return;
    }
  };

  const onSwipe = (direction, mentor_id) => {
    console.log(`You swiped ${direction} on` + mentor_id);
    if (direction === "right") {
      handleSubmit(mentor_id);
    }
  };

  const onCardLeftScreen = (id) => {
    console.log(id + " left the screen");
  };

  const addMentorToMentees = async (uid) => {
    let currentMentors = [];

    const { data } = await supabase
    .from("mentees")
    .select("liked_mentors")
    .match({ id: auth.user.id });

    if (data) {
      if (data[0].liked_mentors.length > 0) {
        currentMentors = data[0].liked_mentors;
        console.log("DATA:", currentMentors);
      }

      //ADD MENTOR TO MENTEES
      const response = await supabase
        .from("mentees")
        .upsert({ id: auth.user.id, liked_mentors: [...currentMentors, uid] });
      if (response) {
        console.log("Handle submit successful.");
      }
    }
  };

  const handleSubmit = async (uid) => {
    let currentMentees = [];

    const { data } = await supabase
      .from("mentors")
      .select("mentees")
      .match({ id: uid });

    if (data) {
      if (data[0].mentees.length > 0) {
        currentMentees = data[0].mentees;
      }

      //ADD MENTEE TO MENTORS
      const response = await supabase
        .from("mentors")
        .upsert({ id: uid, mentees: [...currentMentees, auth.user.id] });
      if (response) {
        addMentorToMentees(uid);
      }
    }
  };

  useEffect(() => {
    fetchIndustry();
    fetchMentors();
  }, [industry]);

  return (
    <div>
      <h1>This is the Match page</h1>
      <div className="card_container">
        {mentors.map((person) => (
          <TinderCard
            className="swipe"
            key={person.id}
            onSwipe={(direction) => onSwipe(direction, person.id)}
            onCardLeftScreen={() => onCardLeftScreen(person.id)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url("https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${person.avatar_url}")`,
              }}
              className="card"
            >
              <h3>{person.name}</h3>
              <h4>{person.industry}</h4>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default Match;
