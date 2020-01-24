import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Login.css';
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";

function Login() {
    return(
        <html lang="en">

        <head>
            <title>Login</title>
        </head>

        <body>
            <div className="contentLogin">
                <h3>Member Login</h3>
                <form>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                </form>
                <div className="loginbutton">
                    <button type="button" onClick={gotoDashboard}>Login</button>
                </div>
                <a href="#">Forgot username/password?</a>
                <div className="signup">
                    <p>Dont have an account?<button onClick={gotoCreateAccount}>Sign up!</button></p>
                </div>
            </div>
        </body>
        </html>
    );
}
function gotoCreateAccount() {
    ReactDOM.render(<CreateAccount/>, document.getElementById('root'));
}
function gotoDashboard() {
    addAccount();
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}
function addAccount() {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1"
    });

    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});


    var params = {
        TableName : "Users",
        Item: {
            'Username' : {S: 'newuser69'}
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
export default Login;
