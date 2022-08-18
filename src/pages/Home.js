import { useState, useEffect } from "react";
import { useAuth } from '../auth'
import { supabase } from "../supabase";

const Home = () => {
  const [name, setName] = useState("");
  const auth = useAuth();

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await supabase
        .from("users")
        .select()
        .match({ id: auth.user.id });
      setName(response.data[0].name);
    };
    fetchInfo();
  }, []);

  return (
    <div>
      {auth.user ? <h1 className="title bounce">Hey {name}!</h1> : <h1 className="title bounce" >Welcome to Coffee Date!</h1>}
      <p className="intro">We are Coffee Date!</p>
      <p className="intro" >One of the first webapps that make it easier to connect with other people in your industry!</p>
      <p className="intro">At Coffee date we are here to help people like you connect with industry leaders and provide mentorship!</p>
      <p className="intro">It doesn't matter whether you have just started or been in your industry for a while, coffee date caters to all level of experiences!</p>
      <div className="instructions">
      <h2> Getting Started </h2>
      {auth.user ? '' : <p> - Create your account! </p>}
      <p> -If you are a <strong>Mentee</strong>, go to find my Mentor</p>
      <p> -Begin Swiping! </p>
      <p> -Mentors will receive a notification and if they like you they will accept you!</p>
      <p> -Start chatting and learn! </p>
      <br/>
      <p> -If you are a <strong>Mentor</strong>, go to notifications</p>
      <p> -If you have been liked by a mentee, you can accept their invite! </p>
      <p> -Mentees will receive a notification!</p>
      <p> -Start chatting and Teach! </p>
      </div>

    </div>
  );
};

export default Home;
