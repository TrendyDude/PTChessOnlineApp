import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './CreateAccount.css';
import Member from "./Member";
import Login from "./Login";
var allow;
var message;
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
                <input type="text" name="username" id="user" placeholder="Username" />
                <input type="password" name="password" id="pass" placeholder="New Password"/>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password"/>
                <input type="text" name="firstname" id="fname" placeholder="First Name"/>
                <input type="text" name="lastname" id="lname" placeholder="Last Name"/>
                /*TODO select user type with radio button (bootstrap)*/
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
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var usertype = "S";
    allowCreation();
    if (allow) {
        addAccount(user, pass, fname, lname, usertype);
        if (allow) {
            ReactDOM.render(<Member/>, document.getElementById('root'));
        }
    } else {
        alert(message)
    }

}
function gotoLogin() {
    ReactDOM.render(<Login/>, document.getElementById('root'));
}

function addAccount(user, password, first, last, usertype) {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        accessKeyId: "AKIA2F56XJ6UFLFPYJLS",                                           //make private
        secretAccessKey: "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"
    });



    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});



    var params = {
        TableName:"Users",
        Item: {
            "Username":{S: user},
            "FirstName":{S: first},
            "Password":{S: password},
            "Usertype":{S: usertype},
            "LastName":{S: last},

        }

    };
    ddb.putItem(params, function (err, data) {
        if(err) {
            console.log("Error", err);
            allow = false;
        } else {
            console.log("Success", data);
        }
    });
}

function allowCreation() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var confirmPass = document.getElementById("confirm_password").value;

    if (user === "" || pass === "" || fname === "" || lname === "" || confirmPass === "") {
        allow = false;
        message = "Please fill in all fields"
    } else if (!(confirmPass === pass)) {
        allow = false;
        message = "Your passwords do not match"
    } else {
        allow = true;
    }

}
export default CreateAccount;