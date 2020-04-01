import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Login.css';
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";

function Login() {
    return(
        <div lang="en">


            <title>Login</title>
            <div className="contentLogin">
                <h3>Member Login</h3>
                <form>
                    <input id="username" type="text" name="username" placeholder="Username"/>
                    <input id="password" type="password" name="password" placeholder="Password"/>
                </form>
                <div className="loginbutton">
                    <button type="button" onClick={gotoDashboard}>Login</button>
                </div>
                <a href="#">Forgot username/password?</a>
                <div className="signup">
                    <p>Dont have an account?<button onClick={gotoCreateAccount}>Sign up!</button></p>
                </div>
            </div>
        </div>
    );
}
function gotoCreateAccount() {
    ReactDOM.render(<CreateAccount/>, document.getElementById('root'));
}
function gotoDashboard() {
    checkAccount(document.getElementById("username").value, document.getElementById("password").value);
}
function checkAccount(userName, password) {
    const AWS = require('aws-sdk');
    const config = require('./config');
    AWS.config.region = "us-east-1";
    AWS.config.accessKeyId = config.accessKey;
    AWS.config.secretAccessKey = config.secretKey;
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'mysqlUserLambda',
        Payload: JSON.stringify({"username": userName, "password": password})
    };


    lambda.invoke(params, function (err, data) {
        if(err) {
            console.log(err);
            alert(JSON.stringify(err));
        } else {
            if(!(data.Payload.toString() === false.toString())){

                var userList = data.Payload.split(',');
                React.useState({
                    UserName: userList[0],
                    UserType: userList[5],
                    Email: userList[4],
                    FirstName: userList[2],
                    LastName: userList[3],
                    Password: userList[1],
                    GroupID: userList[6]});
                ReactDOM.render(<Dashboard/>, document.getElementById('root'));

            }
        }
    });

}



export default Login;


