import React from "react";
import "../../static/css/profile.css";
import Header from "./Header";
const Myprofile = () => {
  return (
    <div>
      <div className="Profile-nav">
        <Header />
      </div>
      <div class="info-card">
        <div className="user-info-card">
          <div className="profile-pic">
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src="https://st3.depositphotos.com/3581215/18899/v/600/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg"
            ></img>
          </div>
          <div className="placeholder"></div>
          <div className="user-stats">
            <div>UserName</div>
            <button className="follow-button">follow</button>

            <div>7 Posts</div>
            <div>10 followers</div>
            <div>5100 following</div>
          </div>
        </div>
      </div>
      <div className="gallery">
        <div className="img-wrap">
          <img
            className="item"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lionel-animals-to-follow-on-instagram-1568319926.jpg?crop=0.922xw:0.738xh;0.0555xw,0.142xh&resize=640:*"
          />
        </div>
        <div className="img-wrap">
          <img
            className="item"
            src="https://images.wsj.net/im-140539?width=1280&size=1"
          />
        </div>

        <div className="img-wrap">
          <img
            className="item"
            src="https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-2.jpg"
          />
        </div>

        <div className="img-wrap">
          <img
            className="item"
            src="https://nypost.com/wp-content/uploads/sites/2/2020/09/quokkas-1.jpg?quality=80&strip=all"
          />
        </div>

        <div className="img-wrap">
          <img
            className="item"
            src="https://compote.slate.com/images/73f0857e-2a1a-4fea-b97a-bd4c241c01f5.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
