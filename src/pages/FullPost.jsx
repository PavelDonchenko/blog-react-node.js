import React from "react";
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios'

export const FullPost = () => {
  const [post, setPost] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const {id} = useParams()
  
  React.useEffect(() => {
    async function fetchPost(){
      try {
        await axios.get(`/posts/${id}`).then((res) => {
          setPost(res.data)
          setIsLoading(false)
        })
      } catch (error) {
        console.warn(error)
      }
    }
    fetchPost()
   
  },[])

  if(isLoading){
    return <Post isLoading = {isLoading} isFullPost/>
  }
  return (
    <>
      <Post
      id={post._id}
      title={post.title}
      imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''} 
      user={post.user}
      createdAt={post.createdAt}
      viewsCount={post.viewsCount}
      commentsCount={3}
      tags={post.tags}
      isFullPost
    >
      <ReactMarkdown children={post.text} />,
    </Post>
    ))
      
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
