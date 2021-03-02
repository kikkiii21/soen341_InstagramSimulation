import React, {useState} from "react";
import "../../static/css/Collapsible.css";

function Collapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="collapsible">
        <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
            Show comments
            </button>
           {isOpen &&  <div className="content">
            Sample Comment
            </div>}
    </div>
}

export default Collapsible;