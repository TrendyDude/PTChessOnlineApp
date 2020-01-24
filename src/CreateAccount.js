import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './CreateAccount.css';

function CreateAccount() {
    return(
        <html lang="en">

        <head>
            <title>Login</title>
        </head>

        <body>
        <div className="contentAcc">
            <h3>Create Account</h3>
            <form>
                <input type="text" name="email" placeholder="Your Email"/>
                <input type="text" name="password" placeholder="New Password"/>
                <input type="text" name="confirm_password" placeholder="Confirm Password"/>
            </form>
            <button type="button">Next</button>
        </div>
        </body>
        </html>
    );
}
export default CreateAccount;