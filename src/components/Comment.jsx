import { useEffect, useState } from "react";
import replyImage from "../images/icon-reply.svg";
import Reply from "./Reply";
import UserReply from "./UserReply";
import jsonData from '../data.json'


function Comment({ comment }) {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    import(`../images/avatars/image-${comment.user.username}.png`)
      .then((image) => setUserImage(image.default))
      .catch((error) =>
        console.error("Error during dynamic image import:", error)
      );
  }, [comment.user.username]);

  return (
    <div className="container">
      <div className="comment">
        <div className="comment-score">
          <button className="comment-score--plus">
            <span className="sr-only">score plus</span>
          </button>
          <p className="comment-score--score">{comment.score}</p>
          <button className="comment-score--minus">
            <span className="sr-only">score minus</span>
          </button>
        </div>

        <div className="comment-header">
          <div className="comment-header--user">
            <img src={userImage} alt="user" />
          </div>
          <h2>{comment.user.username}</h2>
          <p>{comment.createdAt}</p>
        </div>
        <button className="comment-header--reply-btn">
          <img src={replyImage} alt="reply" />
          Reply
        </button>
        <div className="comment-body">{comment.content}</div>
      </div>
      <div className="replies">
        {comment.replies.map((reply) => {
          return (
          reply.user.username === jsonData.currentUser.username ?
          <UserReply reply={reply} />:
           <Reply reply={reply} /> 
        )})}
      </div>
    </div>
  );
}

export default Comment;
