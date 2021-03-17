import React, { useState } from "react";
import CommentList from "./CommentList";

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
