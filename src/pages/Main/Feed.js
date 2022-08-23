import React, { useState, useRef, useEffect } from "react";
import Comment from "./Comment";

function Feed({ feedData }) {
  const [id, setId] = useState(1);
  const value = useRef();
  const [commentArray, setCommentArray] = useState([]);
  useEffect(() => {
    fetch("/data/commentData.json")
      .then((res) => res.json())
      .then((data) => setCommentArray(data.data));
  }, []);

  const addComment = () => {
    setId(id + 1);
    const newComment = {
      id: id,
      userName: "seeyong_0",
      content: value.current.value,
    };
    value.current.value = ""; //인풋창 비우기
    setCommentArray([...commentArray, newComment]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };

  return (
    <div className="feed">
      <div>
        <div className="feed-header">
          <img src="/images/user.png" alt="user-profile" /> {feedData.username}
        </div>
        <div className="feed-imag-container">
          <img
            src={feedData.feedImages[0].imgUrl}
            className="feed-img"
            alt="고양이"
          ></img>
        </div>
        <div className="feed-menu-bar">
          <img src="/images/heart.png" alt="clickToLike" />
          <img src="/images/chat.png" alt="clickToComment" />
          <img src="/images/paper-plane.png" alt="clickToDirectMessage" />
        </div>
        <div id="comments-container">
          <div className="liked-followers">
            <span>
              <span style={{ fontWeight: "bold" }}>sera898</span>님 외 10명이
              좋아합니다
            </span>
          </div>
          <div className="feed-content-container">
            <span>{feedData.content}</span>
          </div>
          <div className="feed-comment-list">
            {commentArray.map((comment) => {
              return (
                <li key={comment.id}>
                  <Comment
                    id={comment.id}
                    content={comment.content}
                    writer={"익명"}
                    createdAt={comment.createdAt || "2022-01-01"}
                  />
                </li>
              );
            })}
          </div>
          <Comment></Comment>
          <div className="comments">
            <input
              className="comments-input"
              type="text"
              placeholder="댓글 달기..."
              /*onChange={(e) => {
                setComment(e.target.value);
              }}*/
              ref={value}
              onKeyDown={onKeyDown}
            />
            <button className="upload-button">게시</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
