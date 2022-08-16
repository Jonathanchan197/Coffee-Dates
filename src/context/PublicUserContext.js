import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";

const publicUserContext = createContext();

export const PublicUserProvider = ({ children }) => {
  const publicUser = useProvidePublicUser();
  return (
    <publicUserContext.Provider value={publicUser}>
      {children}
    </publicUserContext.Provider>
  );
};

export const usePublicUser = () => {
  return useContext(publicUserContext);
};

function useProvidePublicUser() {
  const auth = useAuth();
  const [publicUser, setPublicUser] = useState({});

  const fetch = async () => {
    console.log("fetch is working");

    const response = await supabase
      .from("users")
      .select()
      .match({ id: auth.user.id });

    if (response) {
      setPublicUser(response.data[0]);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    publicUser,
  };
}
