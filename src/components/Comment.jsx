import { useEffect, useState } from "react";
import replyImage from "../images/icon-reply.svg";
import Reply from "./Reply";
import UserReply from "./UserReply";
import jsonData from "../data.json";
import ReplyOnComment from "./ReplyOnComment";

function Comment({ comment }) {
  const [userImage, setUserImage] = useState(null);
  const [openReply, setOpenReply] = useState(false);
  const [replies, setReplies] = useState(comment.replies);

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
        <button
          onClick={() => setOpenReply(!openReply)}
          className="comment-header--reply-btn"
        >
          <img src={replyImage} alt="reply" />
          Reply
        </button>
        <div className="comment-body">{comment.content}</div>
      </div>
      {openReply && (
        <ReplyOnComment
          setOpenReply={setOpenReply}
          replies={replies}
          name={comment.user.username}
          setReplies={setReplies}
        />
      )}
      <div className="replies">
        {replies.map((reply) => {
          return reply.user.username === jsonData.currentUser.username ? (
            <UserReply key={reply.id + 'h82jf'} reply={reply} />
          ) : (
            <Reply replies={replies} setReplies={setReplies} key={reply.id + 'h82jf'} reply={reply} />
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
