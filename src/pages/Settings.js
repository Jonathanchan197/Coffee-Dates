import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import NavBar from "../components/NavBar";

const Settings = () => {
  const auth = useAuth();
  //for options
  const [industries, setIndustries] = useState([]);
  //for user data
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchIndustries() {
      const response = await supabase.from("industry").select("name");

      if (response) {
        setIndustries(response.data.map((industry) => industry.name));
      }
    }
    fetchIndustries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarUrl = "";

    if (image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        setAvatarUrl(data.Key);
        avatarUrl = data.Key;
      }
    }

    const { data, error } = await supabase.from("profiles").upsert({
      id: auth.user.id,
      name: name,
      website: website,
      industry: industry,
      avatar_url: avatarUrl,
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
      <NavBar />
      <h1>Settings</h1>
      {message && message}
      {/* <button onClick={consoleTest}>Console test</button> */}
      {/* <br /> */}
      {avatarUrl ? (
        <img
          src={`https://sphipqdbsrzdckcxbkgk.supabase.co/storage/v1/object/public/${avatarUrl}`}
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
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <select
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {industries.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>

        <div className="form-group">
          <button type={"submit"}>Save profile!</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
