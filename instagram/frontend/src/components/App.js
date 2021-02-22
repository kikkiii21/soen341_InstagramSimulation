import React, { Component } from "react";
import ReactDOM from "react-dom";
import RouterPage from "./RouterPage";



function App() {
    return(
        <div >
            <RouterPage />
            
        </div>
    );
};


ReactDOM.render(<App />, document.getElementById("app"));