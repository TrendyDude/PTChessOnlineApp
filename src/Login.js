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
        </body>
        </html>
    );
}
function gotoCreateAccount() {
    ReactDOM.render(<CreateAccount/>, document.getElementById('root'));
}
function gotoDashboard() {
    var result =  checkAccount(document.getElementById("username").value, document.getElementById("password").value);
    if (result == 0) {
        //TODO add error message on lognin screen
    } else {
        ReactDOM.render(<Dashboard/>, document.getElementById('root'));
    }
}
function checkAccount(userName, password) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    });
    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    var params = {
        TableName: 'Users',
        Key: {
            'Username': {S: userName},
            // 'Password' : {S: password}
        },
        ProjectionExpression: 'ATTRIBUTE_NAME'
    };
    var dataFromGet = null;
    // Call DynamoDB to read the item from the table
    var response = ddb.getItem(params, function(err, data) {
        if (data.Item == null) {
            return 0;
        } else {
            dataFromGet = data.Item;
            return 1;
        }
    });
}
export default Login;
