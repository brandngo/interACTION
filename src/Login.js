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
            <p>The COVID-19 pandemic has had a decidedly negative impact on the mental health of people around the world, both young and old. 60% of young Canadians and 40% of adults reported that their mental health has declined since March. One in ten Canadians have also recently experienced thoughts or feelings of suicide, an increase of 4% since before the pandemic.</p>
            <p>Our solution is interACTION, an optionally anonymous social platform where people suffering from mental illness or simply feeling lonely/depressed can connect with each other through messaging or video chat and access a variety of resources on mental health, wellness and COVID-19.</p>
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
        
    )
}

export default Login;
