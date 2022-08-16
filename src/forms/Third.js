import { useState } from "react";

const Third = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Tell me about yourself.</h2>

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
          <label htmlFor="website">Website:</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>

    </div>
  );
};

export default Third;
