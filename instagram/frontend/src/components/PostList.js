import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import Posts from "./Posts";
import {PostsContext} from './PostsContext';
import { v4 as uid } from "uuid";

 

const PostList = () => {
  const {posts , setPosts} = useContext(PostsContext);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    axios.get('posts/posts/')
      .then((response) => {
        setPosts(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error(err);
      })
    setLoading(false)
  },[])

  

    return(
      <>
        
        {loading? <div>Loading ...</div> : posts.map((item) => (
          <Posts name={item.owner}  avatar={'https://picsum.photos/seed/${uuidv4()}/1100/800'}  postImage={item.photo} postComment={item.title} key={item.id} />
          
        ))}
      </>
    );

};
export default PostList;