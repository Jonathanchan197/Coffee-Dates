import React, { useEffect,useState } from "react";
import { supabase } from "../supabase";

const Fourth = ({formData, setFormData}) => {
  const [skillsList, setSkillsList] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [skills, setSkills] = useState([]);

useEffect(() => {
  async function fetchSkillsList() {
    const response = await supabase.from("skills").select("name");

    if (response) {
      setSkillsList(response.data.map((s) => s.name));
    }
  }
  fetchSkillsList();
},[skills]);

const addSkill = (e) => {
  e.preventDefault();
  if (selectedSkill !== undefined) {
    setSkills([...skills, selectedSkill]);
    setFormData({...formData, skills: [...skills, selectedSkill]});
  }
};

const removeSkill = (e, skill) => {
  e.preventDefault();
  const list = skills;
  setSkills(list.filter((s) => s !== skill));
};

  return (
    <div>
      <div className="form-group">
        <label htmlFor="skills">Skills:</label>
        <ul>
          {skills.length === 0
            ? "No skills to show."
            : formData.skills.map((s) => (
                <li>
                  {s} <button onClick={(e) => removeSkill(e, s)}>Remove</button>
                </li>
              ))}
        </ul>
        <select
          name="skills"
          onChange={(e) => {
            setSelectedSkill(e.target.value)
          }}
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
    </div>
  );
};

export default Fourth;
