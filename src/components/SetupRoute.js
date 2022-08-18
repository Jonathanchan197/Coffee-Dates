import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const SetupRoute = ({ children }) => {
  const auth = useAuth();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const fetchInUsers = async () => {
    const response = await supabase.from("users").select().match({id: auth.user.id});

    if (response.body !== null) {
        console.log("Ssdfds");
        setIsSetupComplete(true);
    } else {
        setIsSetupComplete(false);   
    }
  };

  useEffect(() => {
    fetchInUsers();
    console.log(isSetupComplete);

  }, [isSetupComplete]);

  return isSetupComplete ? children : <Navigate to={"/setup"} />;
};

export default SetupRoute;
