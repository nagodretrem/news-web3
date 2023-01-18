import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const PostPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post/${slug}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo.data);
      });
    });
  }, []);
  const { title, content, image, createdAt, author } = postInfo;

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{title}</h1>
      <time>{format(new Date(createdAt), "d MMM yyyy  HH:mm")}</time>
      <div className="author">{author.name + " " + author.lastname}</div>

      <div className="image">
        <img src={`${process.env.REACT_APP_BASE_URL}/${image}`}></img>
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default PostPage;
