import { supabase } from "./supabase";
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const { error, user } = await supabase.auth.signIn({ email, password });

    if (error) {
      console.log(error);
    }

    return { error, user };
  };

  const register = async (email, password) => {
    const { error, user } = await supabase.auth.signUp(
      { email, password },
      {
        redirectTo: "https://main--stunning-entremet-0abbec.netlify.app//setup",
      }
    );

    if (error) {
      console.log(error);
    }

    return { error, user };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => auth.data.unsubscribe();
  }, []);

  return {
    user,
    login,
    register,
    logout,
  };
}
