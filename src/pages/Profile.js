import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
const Profile = () => {

  const auth = useAuth();

  // const [currentUserData, setCurrentUserData] = useState({});
  // const [industriesList, setIndustriesList] = useState([]);
  // const [skillsList, setSkillsList] = useState([]);
  //for user data to post
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [website, setWebsite] = useState("");

  useEffect ( () => {

    const fetchInfo = async () => {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

      setName(response.data[0].name);
      setIndustry(response.data[0].industry);
      setSkills(response.data[0].skills);
      setWebsite(response.data[0].website);
    }
    fetchInfo();
},[]);

  skills.map((skill) => console.log(skill));

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>Industry: {industry}</p>
      <p>Skills: {skills.map((skill) => skills.length === 0 ? <></> : <li>{skill}</li>)}</p>
      <p>Website: {website}</p>
    </div>
  );
};

export default Profile;
