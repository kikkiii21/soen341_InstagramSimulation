import React, {useState} from "react";
import "../../static/css/Collapsible.css";
import CommentList from "./CommentList";

function Collapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="collapsible">
        <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
            Show comments
            </button>
           {isOpen &&  <div className="content">
            <CommentList />
            </div>}
    </div>
}

export default Collapsible;