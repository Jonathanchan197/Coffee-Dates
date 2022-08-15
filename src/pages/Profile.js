import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import axios from "axios";
import NavBar from "../components/NavBar";
const Profile = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Profile coming soon</h1>
      <p>Email: {auth.user.email}</p>
      <button color="secondary" variant="contained">
        Press me
      </button>
    </div>
  );
};

export default Profile;
