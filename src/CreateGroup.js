import React from "react";
import './App.css';
import './CreateGroup.css'
let {Button, ButtonGroup, ButtonToolbar} = require('react-bootstrap-buttons');

function CreateGroup() {
    return(
        <div lang="en">


            <title>Create Chess Group</title>
            <div className= "mb-2">
                <ButtonGroup size="lg" aria-label="Basic example">
                    <Button variant="primary" size="lg">Left</Button>
                    <Button size="lg" variant="secondary">Middle</Button>
                    <Button size="lg" variant="secondary">Right</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default CreateGroup;