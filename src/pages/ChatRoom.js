import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useAuth } from "../auth";

const ChatRoom = () => {
  const auth = useAuth();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const {data} = await supabase.from('messages').select().match({room_id: chatId})
    setMessages(data)
  }
  
  const handleSubmit = async (e) => {
    const {data} = await supabase.from('messages').insert({content: e, name: auth.user.id, room_id: chatId})
    // setMessages([...messages, {...data[0]}]) // this was causing the double posting
    console.log(data)
  }

  const handleSend = text => { 
    handleSubmit(text)
  }

  const checkOutgoing = (e) => {
    if (auth.user.id===e) {
      return "outgoing"
    } else {
      return "incoming"
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const subscription = supabase.from('messages').on('INSERT', (payload) => {
      setMessages((current) => [...current, payload.new])
      console.log(payload)
    }).subscribe()
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, []);

  return (
    <div>
      <h1 className="title bounce">Chat Room</h1>
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map(m => 
              <Message key={m.id} model={{message: m.content, sender: m.name, direction: checkOutgoing(m.name)}}
              /> 
            )}
          </MessageList>
        <MessageInput placeholder="Type message here" onSend={handleSend} />
      </ChatContainer>
    </MainContainer>
  </div>
  </div>
  );
};

export default ChatRoom;
