import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Member.css';
import Login from "./Login";
import SerialNumber from "./SerialNumber";

function Member() {
    return(
        <html lang="en">

        <head>
            <title>Member</title>
        </head>

        <body>
        <div className="contentMember">
            <h3>Are you a member?</h3>
            <div className="yesno">
                <button type="button" onClick={gotoSerial}>Yes</button>
                <div className="memberNo">
                    <button type="button">No</button>
                </div>
            </div>
            <div className="alreadyAccount">
                <p>Already have an account?<button onClick={gotoLogin}>Sign in!</button></p>
            </div>
        </div>
        </body>
        </html>
    );
}
function gotoLogin() {
    ReactDOM.render(<Login/>, document.getElementById('root'));
}
function gotoSerial() {
    ReactDOM.render(<SerialNumber/>, document.getElementById('root'));
}
export default Member;