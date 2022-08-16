import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../auth";

const Settings = () => {
  const auth = useAuth();
  //current data fetch
  const [industriesList, setIndustriesList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  //for user data to post
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [industry, setIndustry] = useState(industriesList[0]);
  const [selectedSkill, setSelectedSkill] = useState(skillsList[0]);
  const [skills, setSkills] = useState([]);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  async function fetchCurrentUserData() {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setAvatarUrl(response.data[0].avatar_url);
      setName(response.data[0].name);
      setBio(response.data[0].bio);
      setIndustry(response.data[0].industry);
      setSkills(response.data[0].skills);
      setWebsite(response.data[0].website);
    }

    if (response.error) {
      setMessage(response.error);
    }
  }

  async function fetchIndustriesList() {
    const response = await supabase.from("industries").select("name");

    if (response) {
      setIndustriesList(response.data.map((i) => i.name));
    }
  }

  async function fetchSkillsList() {
    const response = await supabase.from("skills").select("name");

    if (response) {
      setSkillsList(response.data.map((s) => s.name));
    }
  }

  useEffect(() => {
    fetchIndustriesList();
    fetchSkillsList();
    fetchCurrentUserData();
  }, []);

  const addSkill = (e) => {
    e.preventDefault();
    console.log("CURRENT USER SKILLS:", skills);
    console.log("SELECTED SKILL:", selectedSkill);
    if (selectedSkill !== undefined) {
        setSkills([...skills, selectedSkill]);
    }
  };

  const removeSkill = (e, skill) => {
    e.preventDefault();
    console.log(`${skill} to be removed.`);
    const list = skills;
    setSkills(list.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatar = avatarUrl;

    if (image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log("DATA KEY:", data.Key);
        setAvatarUrl(data.Key);
        avatar = data.Key;
      }
    }

    const { data, error } = await supabase.from("users").upsert({
      id: auth.user.id,
      avatar_url: avatar,
      name: name,
      bio: bio,
      industry: industry,
      skills: skills,
      website: website,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      setMessage("Profile has been updated! :D");
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <br/>
      {avatarUrl ? (
        <img
          className="pfp"
          src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${avatarUrl}`}
          width={200}
          alt=""
        />
      ) : (
        "No avatar set."
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Choose Avatar:</label>
          <input
            type="file"
            accept={"image/jpeg image/png"}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Display name:</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Biography:</label>
          <br />
          <textarea
            className="textbox"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <br />
          <select
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option key="default"></option>
            {industriesList.map((option) =>
              industry === option ? (
                <option value={option} selected>
                  {option}
                </option>
              ) : (
                <option value={option}>{option}</option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <ul>
            {skills.length === 0 ? "No skills to show." : skills.map((s) => <li>{s} <button onClick={(e) => removeSkill(e, s)}>Remove</button></li>)}
          </ul>
          <select
            name="skills"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option key="default"></option>
            {skillsList.map((option) =>
              skills.includes(option) ? null : (
                <option value={option} key={option}>{option}</option>
              )
            )}
          </select>
          <button onClick={(e) => addSkill(e)}>Add skill</button>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>

        <div className="form-group">
          <button className="success" type={"submit"}>
            Save profile!
          </button> 
          {` ${message && message}`}
        </div>
      </form>
    </div>
  );
};

export default Settings;
