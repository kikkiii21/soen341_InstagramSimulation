import React, { Component } from "react";
import ReactDOM from "react-dom";
import RouterPage from "./RouterPage";
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




function App() {
    return(
        <div >


            <RouterPage />
            
        </div>
    );
};


ReactDOM.render(<App />, document.getElementById("app"));