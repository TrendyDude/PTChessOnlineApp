import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './SerialNumber.css';
import Login from "./Login";

var validCode;
var full;
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
                <input type="number" id="SerialNumber" name="SerialNumber" placeholder="1234567"/>
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
    confirmSerial(document.getElementById("SerialNumber").value);
    ReactDOM.render(<Login/>, document.getElementById('root'));
}

function confirmSerial(serialNumber) {
    const AWS = require('aws-sdk');
    const config = require('./config');
    AWS.config.region = "us-east-1";
    AWS.config.accessKeyId = config.accessKey;
    AWS.config.secretAccessKey = config.secretKey;
    alert(this.state.user.UserName);
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'mysqlCreateUserLambda',
        Payload: JSON.stringify({
            "username": this.state.user.UserName,
            "id": serialNumber
        })
    };
    lambda.invoke(params, function (err, data) {
        if(err) {
            console.log(err);
            alert(JSON.stringify(err));
        } else {
            alert("Successfully added to group: " + data);
        }
    });

}
export default SerialNumber;