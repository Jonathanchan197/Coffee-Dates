import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { AuthUser } from "@supabase/supabase-js";
import { useParams } from 'react-router-dom'

const ChatRoom = () => {
    const {roomId} = useParams()
    console.log(roomId)

  return (
    <div>   
        Chatroom page
    </div>
  )
};

export default ChatRoom;
