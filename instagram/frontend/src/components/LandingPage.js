import React, { Component } from "react";
import Socialmedia from "./socialmedia.png";
import "../../static/css/LandingPage.css";
class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Click here to login",
            sub: "Login"
        };
    }
    styles = {
        fontStyle: "normal",
        color: "Black"
    };
    Buttonchange = () => {
        this.setState({
            message: "",
            sub: "Logged in"
        });
    };
render = () => {
    return(
    <div className="LandingPage"> 
          <ul className="header">
            <li><a href="/">Homepage</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Signup">Signup</a></li>
          </ul>
          <div className="content">
             
          </div>
    
    <style>{'body { background-color: #f8d1c2; }'}</style>
    
        <h1 style={this.styles}>
            Instagram
            </h1>
           <img src={Socialmedia} width="400"/>
           <p/>

           <h3 style={this.style}>
               {this.state.message}
           </h3>

           <button onClick={this.Buttonchange}>{this.state.sub}</button>
           <p/>
        </div>);
    };
}
export default LandingPage;