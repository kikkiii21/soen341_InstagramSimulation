import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";


function App() {
    return(
        <div className="center-contents">
            <HomePage />
            
        </div>
    );
};


ReactDOM.render(<App />, document.getElementById("app"));