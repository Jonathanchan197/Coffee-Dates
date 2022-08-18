import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
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
      .match({ id: userId });

    if (response) {
      setIsMentor(response.data[0].mentor);
    }
  }

  async function fetchInfo() {
    const tableName = isMentor ? "mentors" : "mentees";

    const response = await supabase
      .from(`${tableName}`)
      .select()
      .match({ id: userId });

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
      <h1 className="profiletitle">Profile</h1>
      <div className="profile">
        <div className="pfpname">
          {avatarUrl ? (
            <img
              className="pfp"
              src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${avatarUrl}`}
              alt={avatarUrl}
            />
          ) : (
            <p>
              Time to get a profile picture, no one will swipe right on you.
            </p>
          )}
          <p>{name}</p>
        </div>
        <div className="infos">
          <p>Industry: {industry}</p>
          <p>
            Skills:{" "}
            {skills.map((skill) =>
              skills.length === 0 ? <></> : <p>{skill}</p>
            )}
          </p>
          <p>Website: {website}</p>
          <p>Biography</p>
          <p>{bio}</p>
          <Link to={"/settings"}>
            <button className="success"> Edit Profile </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
