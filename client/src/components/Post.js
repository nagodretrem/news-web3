import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ title, summary, slug, image, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${slug}`}>
          <img src={"https://news-web3.vercel.app/" + image} alt=""></img>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${slug}`}>
          <h2>{title}</h2>
        </Link>
        <div className="info">
          <div className="author">{author.name + " " + author.lastname}</div>
          <time>{format(new Date(createdAt), "d MMM yyyy  HH:mm")}</time>
        </div>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
