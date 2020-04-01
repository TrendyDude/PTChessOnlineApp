import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './CreateAccount.css';
import Member from "./Member";
import Login from "./Login"



var allow;
var message;

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
            <div className="container">
                <div className="row">
                    <div className="col-sm">

                    </div>
                    <div className="col-sm">
                        <input type="text" name="username" id="user" placeholder="Username"/>
                        <input type="password" name="password" id="pass" placeholder="New Password"/>
                        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password"/>
                        {/*TODO check password*/}
                        <input type="text" name="firstname" id="fname" placeholder="First Name"/>
                        <input type="text" name="lastname" id="lname" placeholder="Last Name"/>
                        <input type="email" name="email" id="email" placeholder="Email"/>
                        <div className="btn-group btn-group-toggle d-flex justify-content-center" data-toggle="buttons">
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

                    </div>
                    <div className="col-sm">

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">&nbsp;</div>
                    <div className="col-sm"></div>
                </div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <div className="nextButton">
                            <button type="button" onClick={gotoMember}>Next</button>
                        </div>
                        <div className="alreadyAccount d-flex justify-content-center">
                            Already have an account?&nbsp;<button onClick={gotoLogin}> Sign in!</button>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>

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
    var email = document.getElementById("email").value;
    var usertype = selectedRole;
    allowCreation(user, pass, fname, lname, usertype, email);
    if (allow) {
        addAccount(user, pass, fname, lname, usertype, email);
        if (allow) {
            if(usertype === "T") {

            } else if (usertype === "S") {
                ReactDOM.render(<Member/>, document.getElementById('root'));
            } else {
                ReactDOM.render(<Login/>, document.getElementById('root'));
            }
        }
    } else {
        alert(message)
    }

}
function gotoLogin() {

    ReactDOM.render(<Login/>, document.getElementById('root'));
}

function addAccount(user, password, first, last, usertype, email) {
    const AWS = require('aws-sdk');
    const config = require('./config');
    AWS.config.region = "us-east-1";
    AWS.config.accessKeyId = config.accessKey;
    AWS.config.secretAccessKey = config.secretKey;
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'mysqlCreateUserLambda',
        Payload: JSON.stringify({
            "username": user,
            "password": password,
            "first": first,
            "last": last,
            "email": email,
            "usertype": usertype
        })
    };


    lambda.invoke(params, function (err, data) {
        if(err) {
            console.log(err);
            alert(JSON.stringify(err));
            allow = false;
        } else {
            this.setState({
                UserName: user,
                UserType: usertype,
                Email: email,
                FirstName: first,
                LastName: last,
                Password: password,
                GroupID: "0"});

            alert(this.state.UserName);
            allow = true;
        }
    });
}

function allowCreation(user, pass, fname, lname, usertype, email) {
    var confirmPass = document.getElementById("confirm_password").value;

    if (user === "" || pass === "" || fname === "" || lname === "" || confirmPass === "" || usertype === "" || email === "") {
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