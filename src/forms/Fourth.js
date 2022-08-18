import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Fourth = ({ formData, setFormData }) => {
  const [skillsList, setSkillsList] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);

  async function fetchSkillsList() {
    const response = await supabase.from("skills").select("name");

    if (response) {
      setSkillsList(response.data.map((s) => s.name));
    }
  }

  useEffect(() => {
    fetchSkillsList();
  }, []);

  const addSkill = (e) => {
    e.preventDefault();
    if (selectedSkill !== undefined) {
      setFormData({ ...formData, skills: [...formData.skills, selectedSkill] });
    }
  };

  const removeSkill = (e, skill) => {
    e.preventDefault();
    let list = formData.skills;
    list = list.filter((s) => s !== skill);
    setFormData({ ...formData, skills: [...list] });
  };

  return (
    <div className="fourth">
      <h2 className="bounce">What Skills do you have?</h2>
      <div className="form-group">
        <label htmlFor="skills">Skills:</label>
        {console.log("TEST:", formData.skills)}
        <ul class="lister">
          <br />
          <div className="listerlist">
          {formData.skills.length === 0
            ? "No skills to show."
            : formData.skills.map((s) => (
                <p className="skill-line">
                  {s} <button onClick={(e) => removeSkill(e, s)}>Remove</button>
                </p>
              ))}
          </div>
        </ul>
        <select
          name="skills"
          onChange={(e) => {
            setSelectedSkill(e.target.value);
          }}
        >
          <option key="default"></option>
          {skillsList.map((option) =>
            formData.skills.includes(option) ? null : (
              <option value={option} key={option}>
                {option}
              </option>
            )
          )}
        </select>
        <button id="add" onClick={(e) => addSkill(e)}>Add skill</button>
      </div>
    </div>
  );
};

export default Fourth;
