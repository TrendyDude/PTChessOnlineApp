import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Login.css';
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";
let UserType;
let FirstName;

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
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: "us-east-2",
        endpoint: "https://dynamodb.us-east-2.amazonaws.com"

    });
    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    var params = {
        TableName: "Users",
        KeyConditionExpression: "#user = :user",
        FilterExpression: "#pass = :pass",
        ExpressionAttributeNames: {
            "#user" : "Username",
            "#pass" : "Password"
        },
        ExpressionAttributeValues: {
            ":user" : {S: userName},
            ":pass" : {S: password}
        }
    };
    // Call DynamoDB to read the item from the table
    ddb.query(params, function(err, data) {
        if (err) {
            alert(JSON.stringify(err));
        } else {
            if (data.Items.length === 1) {
                UserType = data.Items[0].UserType.S;
                FirstName = data.Items[0].FirstName.S;
                ReactDOM.render(<Dashboard/>, document.getElementById('root'));
            } else {
                alert("Incorrect Username or Password");
                alert("Random!");
            }
        }
    });
}
export default Login;
export {FirstName, UserType};

