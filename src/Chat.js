import React, { useState, useEffect } from 'react'
import "./Chat.css";
import ChatHeader from "./ChatHeader"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import Message from "./Message";
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from './firebase';
import firebase from "firebase";
import { Button } from "@material-ui/core";


function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
          db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
      }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        });
        setInput("");
    }

    return (
        <div className="chat">
            <div className="welcome">
            {channelName &&  <ChatHeader channelName={channelName} />}
                {!channelId && <div style={{marginTop:"12px"}}>
                <h1 style={{color:"white",textAlign:"center", marginTop:"20px", fontSize:"50px"}}>Welcome to interACTION!</h1>
               <img src="https://media.giphy.com/media/SRwYKvMGfvqlcdTJuX/giphy.gif" style={{display: "block",
               marginTop:"30px",
                marginLeft: "auto",
                marginRight:"auto",
                width: "30%"}}/>
                <p style={{color:"white", textAlign:"center", fontSize:"20px", marginTop:"20px", marginLeft:"20px", marginRight:"20px"}}>interACTION is a platform designed for those suffering from mental illnesses (or are simply stressed/upset!) to have a place to anonymously (only your first name is shown to the world!) release their emotional discomforts and have their troubles listened to via chatting or video chatting with others who empathize because they're experiencing the same.</p>
                <p style={{color:"white", textAlign:"center", fontSize:"20px", marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>Enjoy your stay, or click on your avatar (bottom left) to log out! </p>
                <p style={{color:"white", textAlign:"center", fontSize:"20px", marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>XOXO, the development team (Joy, Brandon, Nemo, Mary-Emma) </p>
                
                <div className="btns">
                <Button>Video Chat With Someone 🥺 👉👈</Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    window.location.href="https://interAction.maryemmabarnhil.repl.co"}}>Resources!</Button>
                    </div>

                
                </div>}
            </div>

            <div className="chat__messages">
                {messages.map((message) => (
                    <Message
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                    />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon />
                <form>
                    <input value={input} disabled={!channelId} onChange={e => setInput(e.target.value)} placeholder={`${channelName === null ? `Please select a channel on the left or create your own with the + button!` :`${channelName}`}`} />
                    <button disabled={!channelId} className="chat__inputButton" type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
