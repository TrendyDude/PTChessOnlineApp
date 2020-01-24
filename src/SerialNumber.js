import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './SerialNumber.css';
import Login from "./Login";

function SerialNumber() {
    return(
        <html lang="en">

        <head>
            <title>CreateAccount</title>
        </head>

        <body>
        <div className="contentSerial">
            <h3>Enter your serial number</h3>
            <form>
                <input type="text" name="SerialNumber" placeholder="12345678"/>
            </form>
            <div className="nextButton">
                <button type="button" onClick={gotoLogin}>Next</button>
            </div>
            <div className="serialCancel">
                <button type="button">Cancel</button>
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
export default SerialNumber;