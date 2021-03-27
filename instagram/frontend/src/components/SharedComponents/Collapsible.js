import React, { useState } from "react";
import CommentList from "./CommentList";
import "../../../static/css/collapsible.css";

function Collapsible({ pid, event }) {
  return (
    <div className="collapsible">
      {event && (
        <div className="content">
          <CommentList pid={pid} />
        </div>
      )}
    </div>
  );
}

export default Collapsible;
