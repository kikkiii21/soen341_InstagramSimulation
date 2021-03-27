import React, { useState, useEffect } from "react";
import "../../../static/css/profile.css";
import Header from "../SharedComponents/Header";
import axios from "axios";
import ProfilePostList from "../SharedComponents/ProfilePostList";
const Profile = () => {
  //state
  const [userVisitedName, setUserVisitedName] = useState("");
  const [contentsLoading, setContentLoading] = useState(true);
  const [redirectedName, setRedirectedName] = useState(
    JSON.parse(localStorage.getItem("profileRedirect"))
  );
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [userId, setUserId] = useState(0);
  const localUserInfo = localStorage.getItem("userInfo");
  const isProfileOwner = JSON.parse(localUserInfo).author == redirectedName;
  const [alreadyFollowing, setAlreadyFollowing] = useState(true);

  //Event Handlers
  const followUserHandler = () => {
    setAlreadyFollowing(true);
    const payload = {
      following: userId,
    };

    axios
      .post("followEndpoint/", payload, {
        headers: {
          "content-type": "application/json",
          Authorization: `token ${JSON.parse(localUserInfo).token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("userlistEndpoint/")
      .then((response) => {
        const parseUser = response.data.filter(
          (user) => user.username == redirectedName
        );
        setUserVisitedName(parseUser[0].username);
        setNumberOfFollowing(parseUser[0].follows.length);
        setNumberOfPosts(parseUser[0].posts.length);
        setUserId(parseUser[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("followEndpoint/")
      .then((response) => {
        const parseFollowers = response.data;
        const num = parseFollowers.filter((item) => item.following == userId);
        const followCheck = parseFollowers.filter(
          (item) => item.user == JSON.parse(localUserInfo).name
        );
        const checked = followCheck.filter((item) => item.following == userId);

        setNumberOfFollowers(num.length);
        setAlreadyFollowing(checked.length != 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId, alreadyFollowing]);

  useEffect(() => {
    setContentLoading(false);
    localStorage.setItem("profileName", JSON.stringify(userVisitedName));
  }, [
    userVisitedName,
    numberOfPosts,
    numberOfFollowing,
    userId,
    numberOfFollowers,
  ]);

  return (
    <div>
      <div className="Profile-nav">
        <Header />
      </div>
      <div class="info-card">
        <div className="user-info-card">
          <div className="profile-wrap">
            <img src={JSON.parse(localUserInfo).avatar} />
          </div>
          <div className="placeholder"></div>
          <div className="user-stats">
            <div>
              {contentsLoading ? <div>Loading ...</div> : userVisitedName}
            </div>
            {isProfileOwner || alreadyFollowing ? (
              ""
            ) : (
              <button className="follow-button" onClick={followUserHandler}>
                follow
              </button>
            )}

            <div>{numberOfPosts} Posts</div>
            <div>{numberOfFollowers} followers</div>
            <div>{numberOfFollowing} following</div>
          </div>
        </div>
      </div>
      <div className="gallery">
        {contentsLoading ? <div>loading ...</div> : <ProfilePostList />}
      </div>
    </div>
  );
};

export default Profile;
