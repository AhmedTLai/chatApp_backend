import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import MessageArea from "./MessageArea";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import {io} from 'socket.io-client'
// import { throws } from "assert";

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  position: relative;

  @media (max-width: 700px) {
    max-height: 15vh; /* Adjusted max-height for smaller screens */
  }
`;



const TheirMessage = styled.div`
  text-align: right;
  margin-left: auto;
  padding: 15px;
  white-space: wrap;
  word-break: break-word;
`;

const GreenDot = styled.div`
  max-width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #68d391;
`;

const RedDot = styled.div`
  max-width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #711;
`;

const MessagesCont = (userData) => {
  const [online, setOnline] = useState(true);
  const {currentUser} = useContext(AuthContext)
  const user_id = currentUser.data.user_id
  const room_id = location.href.split('/')[4] || userData?.data?.user_id
  const [messageData , setMessageData] = useState() 
  const [inp,setInp] = useState('')
  const [sent, setSent] = useState('')
  const socket = useRef()
  const [arivalMessage, setArivalMessage] = useState(null)
  const [messages,setMessages] = useState(null)
  userData = userData?.userData?.data

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("receiveMessage", (data) => {
      setArivalMessage({
        sender_id: data.sender_id,
        message: data.message,
        created_at: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // Add the current user to the socket room
    socket.current.emit("addUser", user_id);

    socket.current.on("getUsers", (users) => {
      const isOnline = users.some((u) => u.user_id === user_id);
      setOnline(isOnline);
    });

    return () => {
      socket.current.off("getUsers");
    };
  }, [user_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/messenger/getmessages/${user_id}/${room_id}`)
      .then((res) => {
        setMessageData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  }, [room_id, arivalMessage,inp]);

  const SendMessage = (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      sender_id: user_id,
      receiver_id: room_id,
      message: inp,
    });

    try {
      axios
        .put("http://localhost:3000/api/messenger/sendmessage", {
          user_id,
          message: inp,
          room_id,
        })
        .then((res) => {
          setInp("");
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (arivalMessage) {
      setMessages((prev) => (prev ? [...prev, arivalMessage] : [arivalMessage]));
    }
  }, [arivalMessage]);
  
  // console.log(messageData);
  return (
    <>
    {userData ?
      <MessagesContainer style={{height : '100%'}}>
      {/* Message sender section */}
      <div className="d-flex align-items-center gap-3 border-bottom py-3" style={{ maxHeight: "70px", maxWidth: "100%" }}>
        {/* ... (rest of your sender section) */}
        <div className="w-100 flex3 lh-1">
          <h5 className="position-relative top-0">
            <strong>{userData.fullname}</strong>
          </h5>
          <div className="d-flex align-items-center gap-1">
            {online ? <GreenDot /> : <RedDot />} {online ? "Online" : "Offline"}
          </div>
        </div>
        {/* ... (rest of your sender section) */}
      </div>

      {/* Message area */}

      
        
        <div  className="h-100">
      <MessageArea userdata={userData} messageData={messageData} />
      </div>

      {/********************************************/}
<form onSubmit={SendMessage}>
        <div className="d-flex align-items-center position-relative" style={{ bottom: '10px' }}>
        <label htmlFor="file" role="button" tabIndex="0" className="fs-4"><i className="fa-solid fa-paperclip text-black-50 mx-3" ></i></label>
        <input type="file" name="file" id="file" className="d-none"/>
        <div className="bg-body-secondary py-3 px-3 my-3 w-100 rounded d-flex justify-content-between align-items-center">  
      
      <input value={inp} onChange={(e)=>{
        setInp(e.target.value)
      }} maxLength="100" type="text" id="message" name="message" className="w-100 border-0 bg-body-secondary "/>
      
      <button className="btn  text-white"style={{backgroundColor : '#615EF0'}}><i  className="fa-solid fa-paper-plane" ></i></button>
      
      </div>
      
      </div>
</form>
    </MessagesContainer>
    :
    <div className="flex-2 text-center">
      <h1 className="text-start" style={{color : 'darkgray',fontSize : '50px',marginTop : '50px'}}>Open a converstation to start a Chat </h1>
    </div>
    }
    </>
  )
}
//     color: darkgray;
//     font-size: 50px;
//     text-align: start;
//     margin: 50px 0px;
export default MessagesCont