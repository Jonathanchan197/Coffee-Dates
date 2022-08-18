import { supabase } from "../supabase";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

const Review = ({ formData, setFormData }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleMentor = async (e) => {
    e.preventDefault();

    let avatar = formData.avatarUrl;

    if (formData.image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${formData.image.name}`, formData.image);

      if (error) {
        console.log(error);
      }

      if (data) {
        setFormData({ ...formData, avatarUrl: data.Key });
        avatar = data.Key;
      }
    }

    const { data, error } = await supabase.from("mentors").upsert({
      id: auth.user.id,
      name: formData.name,
      bio: formData.bio,
      industry: formData.industry,
      skills: formData.skills,
      website: formData.website,
      mentor: formData.isMentor,
      avatar_url: avatar,
      tasks: []
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("Profile has been updated! :D");
    }

    navigate("/dashboard");
  };

  const handleMentee = async (e) => {
    e.preventDefault();

    let avatar = formData.avatarUrl;

    if (formData.image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${formData.image.name}`, formData.image);

      if (error) {
        console.log(error);
      }

      if (data) {
        setFormData({ ...formData, avatarUrl: data.Key });
        avatar = data.Key;
      }
    }

    const { data, error } = await supabase.from("mentees").upsert({
      id: auth.user.id,
      name: formData.name,
      bio: formData.bio,
      industry: formData.industry,
      skills: formData.skills,
      website: formData.website,
      mentor: formData.isMentor,
      avatar_url: avatar,
      tasks: []
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("Profile has been updated! :D");
    }

    navigate("/dashboard");
  };

  return (
    <div className="review">
      <h1 className="bounce">Please review your Information before posting.</h1>
      <div className="reviewcontent">
      <h3>Mentor Status: <span className="diffcolorfont"> {formData.isMentor === true ? "True" : "False"} </span> </h3>
      <h3>Industry: <span className="diffcolorfont">{formData.industry}</span> </h3>
      <h3>Image: <span className="diffcolorfont">{formData.image.name}</span> </h3>
      <h3>Name: <span className="diffcolorfont">{formData.name}</span> </h3>
      <h3>Bio: <span className="diffcolorfont">{formData.bio}</span> </h3>
      <h3>Website: <span className="diffcolorfont">{formData.website}</span> </h3>
      <h3>Skills: </h3>
      <span className="diffcolorfont listofskills">{
      formData.skills.length === 0 ? <p>No skills to show.</p> : formData.skills.map((s) => (<p>{s}</p>))}
      </span>
      </div>
      <button
        className="success"
        onClick={formData.isMentor === true ? handleMentor : handleMentee}
      >
        Save
      </button>
    </div>
  );
};
export default Review;
