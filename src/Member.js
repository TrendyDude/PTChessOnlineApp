import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Member.css';

function Member() {
    return(
        <html lang="en">

        <head>
            <title>Member</title>
        </head>

        <body>
        <div className="contentMember">
            <h3>Are you a member?</h3>
            <button type="button">Yes</button>
            <div className="memberNo">
                <button type="button">No</button>
            </div>
        </div>
        </body>
        </html>
    );
}
export default Member;