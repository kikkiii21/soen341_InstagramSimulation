import React, {useState} from "react";
import "../../static/css/Collapsible.css";
import CommentList from "./CommentList";

function Collapsible({pid}) {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="collapsible">
        <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
            Comments
            </button>
           {isOpen &&  <div className="content">
            <CommentList pid={pid}/>
            </div>}
    </div>
}

export default Collapsible;