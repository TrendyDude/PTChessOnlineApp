import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './CreateAccount.css';
import Member from "./Member";
import Login from "./Login";

function CreateAccount() {
    return(
        <html lang="en">

        <head>
            <title>CreateAccount</title>
        </head>

        <body>
        <div className="contentAcc">
            <h3>Create Account</h3>
            <form>
                <input type="text" name="email" placeholder="Your Email"/>
                <input type="password" name="password" placeholder="New Password"/>
                <input type="password" name="confirm_password" placeholder="Confirm Password"/>


            </form>
            <div className="nextButton">
                <button type="button" onClick={gotoMember}>Next</button>
            </div>
            <div className="alreadyAccount">
                <p>Already have an account?<button onClick={gotoLogin}>Sign in!</button></p>
            </div>
        </div>
        </body>
        </html>
    );
}

function gotoMember() {
    ReactDOM.render(<Member/>, document.getElementById('root'));
}
function gotoLogin() {
    ReactDOM.render(<Login/>, document.getElementById('root'));
}
export default CreateAccount;