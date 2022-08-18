import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { chatId } = useParams();

  return (
    <div>
      <h1>Chat Room Id: {chatId}</h1>
    </div>
  );
};

export default ChatRoom;
