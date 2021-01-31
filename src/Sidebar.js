import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import { login } from "./features/userSlice";
import VideoCallIcon from '@material-ui/icons/VideoCall';

function Sidebar() {
    var user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))
    }, []);

    const handleAddChannel = () => {
        if(prompt("Only admins are permitted to create new channels :) Enter the password to prove you're an admin!")!=="the password")
        {
            alert("Sorry, you're not an admin lol :P");
            return;
        }
        const channelName=prompt("Welcome, admin! Enter a new channel name.");
        if(channelName){
            db.collection('channels').add({
                channelName: channelName,
            });
        }
    }
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    const goAnonymous = () => {
        if(user.displayName=="Anonymous")
        {
            alert("You're already anonymous!");
            return;
        }
        if(prompt("Go fully anonymous? Please understand that that only means your name and avatar will not be revealed to the public. You must still remain respectful in your actions, and any inappropriate actions will result in you being banned. Please type yes if you understand and still want to go anonymous.")=="yes")
        {
            dispatch(
                login({
                  uid: user.uid,
                  photo: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  email: user.email,
                  displayName: "Anonymous",
                }),
              );
            //alert("LOL sorry something went wrong! Don't worry though, we will still only display your first name, which should be enough to keep you anonymous for now. If not, you can always click on your avatar to log out and sign in to another google account without your real name :)");
        }
            
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>interACTION</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Express Yourself! 🥰 🥺</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    ))}
                </div>
            </div>

            <div className="sidebar__profile">
                    <Avatar onClick={() => auth.signOut()} src={user.photo} />
                    <div className="sidebar__profileInfo">
                        <h3>{user.displayName.split(" ")[0]}</h3>
                        <p>#{user.uid.substring(0, 6)}</p>
                    </div>
                    <div className="sidebar__profileIcons">
                        <VisibilityOffIcon onClick={goAnonymous} />
                        <VideoCallIcon onClick={()=> openInNewTab("https://interaction-e7a64.web.app/")} />
                    </div>
                </div>

        </div>
    )
}

export default Sidebar
