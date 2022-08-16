import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
const Profile = () => {

  const auth = useAuth();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  useEffect ( () => {

    const fetchInfo = async () => {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

      setImage(response.data[0].avatar_url);
      setName(response.data[0].name);
      setIndustry(response.data[0].industry);
      setSkills(response.data[0].skills);
      setWebsite(response.data[0].website);
      setBio(response.data[0].bio);
    }
    fetchInfo();
},[]);
  return (
    <div>
      <h1>Profile</h1>
      <img className="pfp" src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${image}`} alt="Time to get a profile picture, no one will swipe right on you. "/>
      <p>Name: {name}</p>
      <p>Industry: {industry}</p>
      <p>Skills: {skills.map((skill) => skills.length === 0 ? <></> : <li>{skill}</li>)}</p>
      <p>Website: {website}</p>
      <p>Biography</p>
      <p>{bio}</p>
      <button className="success"> Edit Profile </button>
    </div>
  );
};

export default Profile;
