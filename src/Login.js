import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Login.css';

function Login() {
    return(
        <html lang="en">

        <head>
            <title>Login</title>
        </head>

        <body>
            <div className="content">
                <h3>Member Login</h3>
                <form>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="text" name="password" placeholder="Password"/>
                </form>
                <button type="button">Login</button>
                <a href="#">Forgot username/password?</a>
                <div className="signup">
                    <p>Dont have an account? <a href="#">Sign up!</a></p>

                </div>
            </div>
        </body>
        </html>
    );
}
export default Login