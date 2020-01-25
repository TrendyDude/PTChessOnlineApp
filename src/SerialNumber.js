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
                <input type="Number" id="SerialNumber" name="SerialNumber" placeholder="1234567"/>
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
    if (validCode && !full) {
        ReactDOM.render(<Login/>, document.getElementById('root'));
    }
}

function confirmSerial(serialNumber) {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        accessKeyId: "AKIA2F56XJ6UFLFPYJLS",                                           //make private
        secretAccessKey: "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"
    });



    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

    var groupID;



    var params2 = {
        TableName:"AccessCodes",
        KeyConditionExpression: "#Code = :Code",
        ExpressionAttributeNames: {
            "#Code": "Code"
        },
        ExpressionAttributeValues: {
            ":Code" : serialNumber
        }

    };
    ddb.query(params2, function (err, data) {
        if(err) {
            validCode = false;
            alert("Invalid Code");
            console.log("Error", err);
        } else {
            validCode = true;
            console.log("Success", data);
            data.Items.forEach(function (item) {
                groupID = item.GroupID.N
            });
        }
    });
    if (validCode) {
        var params1 = {
            TableName:"Groups",
            Key: {
                "GroupID": {N: groupID}
            },
            UpdateExpression: "set Enrolled = Enrolled + 1",
            ConditionExpression: "Enrolled < Capacity"

        };
        ddb.updateItem(params1, function (err, data) {
            if(err) {
                full = true;
                alert("Class is full");
                console.log("Error", err);
            } else {
                full = false;
                console.log("Success", data);
            }
        });
    }

}
export default SerialNumber;