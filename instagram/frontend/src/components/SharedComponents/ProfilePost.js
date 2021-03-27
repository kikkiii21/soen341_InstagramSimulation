import React, { useState } from "react";
import "../../../static/css/profile.css";

const ProfilePost = ({ imageUrl, key }) => {
  return (
    <div className="img-wrap">
      <img className="item" src={imageUrl} />
    </div>
  );
};

export default ProfilePost;
