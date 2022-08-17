import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import TinderCard from "react-tinder-card";
import "./TinderCard.css";

const Match = () => {
  const [people, setPeople] = useState([]);

  const onSwipe = (direction) => {
    console.log(`You swiped ${direction}.`);
  };

  const onCardLeftScreen = (id) => {
    console.log(id + " left the screen");
  };

  useEffect(() => {
    const fetchMentor = async () => {
      const { data } = await supabase.from("mentors").select("*");
      setPeople(data);
      if (!data) {
        alert("no mentors found!");
        return;
      }
    };
    fetchMentor();
  }, []);

  return (
    <div>
      <h1>This is the Match page</h1>
      <div className="card_container">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.id}
            onSwipe={onSwipe}
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