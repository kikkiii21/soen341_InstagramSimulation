import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePost from "./ProfilePost";
import { v4 as uid } from "uuid";

const ProfilePostList = () => {
  //state
  const localProfileName = JSON.parse(localStorage.getItem("profileName"));
  const [postsData, serPostsData] = useState([]);
  const [userVisitedPictures, setUserVisitedPictures] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    axios
      .get("postsEndpoint/")
      .then((response) => {
        serPostsData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const profilePosts = postsData.filter(
      (post) => post.author == localProfileName
    );
    setUserVisitedPictures(profilePosts);
    setImagesLoading(false);
  }, [postsData, userVisitedPictures]);

  return (
    <>
      {imagesLoading ? (
        <div>Loading ...</div>
      ) : (
        userVisitedPictures.map((item) => (
          <ProfilePost imageUrl={item.photo} key={uid()} />
        ))
      )}
    </>
  );
};

export default ProfilePostList;
