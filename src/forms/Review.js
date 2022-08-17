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
    <div>
      <h2>Please review your Information before posting.</h2>
      <h3>Mentor Status: {formData.isMentor === true ? "True" : "False"}</h3>
      <h3>Industry: {formData.industry}</h3>
      <h3>Image: {formData.image.name}</h3>
      <h3>Name: {formData.name}</h3>
      <h3>Bio: {formData.bio}</h3>
      <h3>Website: {formData.website}</h3>
      <h3>Skills: {formData.skills}</h3>
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
