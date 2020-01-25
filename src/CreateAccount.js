import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './CreateAccount.css';
import Member from "./Member";
import Login from "./Login";

var selectedRole = null;
function CreateAccount() {
    return(
        <html lang="en">

        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />

            <title>CreateAccount</title>
        </head>

        <body>
        <div className="contentAcc">
            <h3>Create Account</h3>
            <form>
                <input type="text" name="username" id="user" placeholder="Username"/>
                <input type="password" name="password" id="pass" placeholder="New Password"/>
                <input type="password" name="confirm_password" placeholder="Confirm Password"/> //TODO check password
                <input type="text" name="firstname" id="fname" placeholder="First Name"/>
                <input type="text" name="lastname" id="lname" placeholder="Last Name"/>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label id="button1" className="btn btn-secondary">
                        <input type="radio" name="options" id="option1" autoComplete="off" onClick={select1}/>
                        Teacher
                    </label>
                    <label id="button2" className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autoComplete="off" onClick={select2}/>
                        Student
                    </label>
                    <label  id="button3" className="btn btn-secondary">
                        <input type="radio" name="options" id="option3" autoComplete="off" onClick={select3} />
                        Administrator
                    </label>
                </div>
            </form>
            <div className="row">
                <div className="col-xs-3"> </div>
                <div className="col-xs-3">

                </div>
            </div>
            <div className="nextButton">
                <button type="button" onClick={gotoMember}>Next</button>
            </div>
            <div className="alreadyAccount">
                <p>Already have an account? <button onClick={gotoLogin}>Sign in!</button></p>
            </div>
        </div>
        </body>
        </html>
    );
}
function select1() {
    //console.log("clicked");
    document.getElementById("button1").className = "btn btn-info";
    document.getElementById("button2").className = "btn btn-secondary";
    document.getElementById("button3").className = "btn btn-secondary";
    selectedRole = "T";
}
function select2() {
    document.getElementById("button1").className = "btn btn-secondary";
    document.getElementById("button2").className = "btn btn-info";
    document.getElementById("button3").className = "btn btn-secondary";
    selectedRole = "S";
}
function select3() {
    document.getElementById("button1").className = "btn btn-secondary";
    document.getElementById("button2").className = "btn btn-secondary";
    document.getElementById("button3").className = "btn btn-info";
    selectedRole = "A";
}
function buttonchange(element) {
        element.addClass("active").siblings().removeClass("active");
        element.addClass("active");
}
function gotoMember() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var usertype = selectedRole;
    addAccount(user, pass, fname, lname, usertype);
    ReactDOM.render(<Member/>, document.getElementById('root'));
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
        } else {
            console.log("Success", data);
        }
    });
}
export default CreateAccount;