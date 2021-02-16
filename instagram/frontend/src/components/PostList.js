import React from "react";
import Posts from "./Posts";

const PostList = ({posts, setPosts}) => {
    return(
        posts.map((post) => (
            
                 <Posts name={post.name} avatar={post.avatar} postImage={post.postImage} postComment={post.postComment} key={post.id} />
           
        ))   
    );

};
export default PostList;