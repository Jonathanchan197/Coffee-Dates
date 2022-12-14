import React, { useEffect, useState } from "react";
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
  const [isMentor, setIsMentor] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchMentorOrMentee() {
    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

      if (response) {
        setIsMentor(response.data[0].mentor);
      }
  }

  async function fetchCurrentUserData() {
    const tableName = isMentor ? "mentors" : "mentees";

    const response = await supabase
      .from(`${tableName}`)
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
    fetchMentorOrMentee();
    fetchCurrentUserData();
  }, [isMentor]);

  const addSkill = (e) => {
    e.preventDefault();
    if (selectedSkill !== undefined) {
      setSkills([...skills, selectedSkill]);
    }
  };

  const removeSkill = (e, skill) => {
    e.preventDefault();
    const list = skills;
    setSkills(list.filter((s) => s !== skill));
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
        setAvatarUrl(data.Key);
        avatar = data.Key;
      }
    }

    const tableName = isMentor ? "mentors" : "mentees";

    const { data, error } = await supabase.from(`${tableName}`).upsert({
      id: auth.user.id,
      avatar_url: avatar,
      name: name,
      bio: bio,
      industry: industry,
      skills: skills,
      website: website,
      mentor: isMentor,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      setMessage("Profile has been updated! :D");
    }
  };

  return (
    <div className="setting">
      <h1>Settings</h1>
      <br />
      {avatarUrl ? (
        <img
          className="pfp"
          src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${avatarUrl}`}
          width={200}
          alt={avatarUrl}
        />
      ) : (
        "No avatar set."
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Choose Avatar</label>
          <input
            type="file"
            accept={"image/jpeg image/png"}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Display name</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Biography</label>
          <br />
          <textarea
            className="textbox"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>

        <div className="form-group">
          <br/>
          <label htmlFor="industry">Industry</label>
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
        <br/>
        <div className="form-group">
          <label className="skilltitle" htmlFor="skills">Skills</label>
          <ul>
            <div className="listerlist">
            {skills.length === 0
              ? <p id="skilledlists">No skills to show.</p>
              : skills.map((s) => (
                  <p className="skilling">
                    {s}{" "}
                    <button onClick={(e) => removeSkill(e, s)}>Remove</button>
                  </p>
                ))}
                </div>
          </ul>
          <select
            name="skills"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option key="default"></option>
            {skillsList.map((option) =>
              skills.includes(option) ? null : (
                <option value={option} key={option}>
                  {option}
                </option>
              )
            )}
          </select>
          <button onClick={(e) => addSkill(e)}>Add skill</button>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>

        <div className="form-group">
          <label htmlFor="isMentor">I am a mentor </label>
          <input
            type="checkbox"
            value={isMentor}
            checked={isMentor}
            onChange={(e) =>
              e.target.checked ? setIsMentor(true) : setIsMentor(false)
            }
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
