import React from "react";
import './App.css';
import './CreateGroup.css'

function CreateGroup() {
    return(
        <div lang="en">


            <title>Create Chess Group</title>
            <div className= "mb-2">
                <dv size="lg" aria-label="Basic example">
                    <button variant="primary" size="lg">Left</button>
                    <button size="lg" variant="secondary">Middle</button>
                    <button size="lg" variant="secondary">Right</button>
                </dv>
            </div>
        </div>
    );
}

export default CreateGroup;