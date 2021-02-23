import React, {useState, createContext} from 'react';
import { v4 as uid } from "uuid";

// ===========================================
// TODO: continue setting up react context Api 
// to make state available in many components 
// ===========================================

export const LoggedInContext = createContext();

export const LoggedStatusProvider = props => {
    
    const [LoggedInUserInfo, setLoggedInUserInfo] = useState({name: "Arthur Morgan", avatar: "../../static/images/arthur.jpg", id: uid()});

    return(
        <LoggedInContext.Provider value={LoggedInUserInfo, setLoggedInUserInfo}>
        {props.children}
        </LoggedInContext.Provider>

    );
}