import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Second = ({formData, setFormData}) => {
  const [industriesList, setIndustriesList] = useState([]);

  useEffect(() => {
    async function fetchIndustriesList() {
      const response = await supabase.from("industries").select("name");

      if (response) {
        setIndustriesList(response.data.map((i) => i.name));
      }
    }
    fetchIndustriesList();
  }, []);

  return (
    <div className="second">
      <h2 className="bounce" >What Industry are you in?</h2>
      <div className="form-group">
        <label htmlFor="industry"></label>
        <br />
        <select
          name="industry"
          value={formData.industry}
          onChange={(e) => setFormData({...formData, industry:e.target.value})}
        >
          <option key="default"></option>
          {industriesList.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Second;
