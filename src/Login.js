import React from 'react'
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://cdn.discordapp.com/attachments/803798366462279711/805136887777067039/interAction_1.png" alt=""/>
            </div>
            <p>Message goes here, haven't bothered with that yet</p>
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
        
    )
}

export default Login;
