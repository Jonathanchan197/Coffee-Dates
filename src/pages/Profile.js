import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
const Profile = () => {
  const auth = useAuth();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  async function fetchMentorOrMentee() {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setIsMentor(response.data[0].mentor);
    }
  }

  async function fetchInfo() {
    const tableName = isMentor ? "mentors" : "mentees";

    const response = await supabase
      .from(`${tableName}`)
      .select()
      .match({ id: auth.user.id });

    setAvatarUrl(response.data[0].avatar_url);
    setName(response.data[0].name);
    setIndustry(response.data[0].industry);
    setSkills(response.data[0].skills);
    setWebsite(response.data[0].website);
    setBio(response.data[0].bio);
  }

  useEffect(() => {
    fetchMentorOrMentee();
    fetchInfo();
  }, [isMentor]);

  return (
    <div>
      <div className="mob">
        <h1>Profile</h1>
        {avatarUrl ? (
          <img
            className="pfp"
            src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${avatarUrl}`}
            alt={avatarUrl}
          />
        ) : (
          <p>Time to get a profile picture, no one will swipe right on you.</p>
        )}
      </div>
      <p>Name: {name}</p>
      <p>Industry: {industry}</p>
      <p>
        Skills:{" "}
        {skills.map((skill) =>
          skills.length === 0 ? <></> : <li>{skill}</li>
        )}
      </p>
      <p>Website: {website}</p>
      <p>Biography</p>
      <p>{bio}</p>
      <button className="success"> Edit Profile </button>
    </div>
  );
};

export default Profile;
