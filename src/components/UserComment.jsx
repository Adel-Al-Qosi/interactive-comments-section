import { useEffect, useState } from "react";
import editImage from "../images/icon-edit.svg";
import deleteImage from "../images/icon-delete.svg";
import Reply from "./Reply";
import fallbackImage from "../images/avatars/image-juliusomo.png";
function UserComment({ comment }) {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../images/avatars/image-${comment.user.username}.png`);
        setUserImage(image.default);
      } catch (error) {
        console.error("Error during dynamic image import:", error);
        setUserImage(fallbackImage);
      }
    };

    loadImage();
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
          <p className="comment-header--you">you</p>
          <p>{comment.createdAt}</p>
        </div>
        <div className="comment-header--reply-btn">
          <button className="delete btn">
            <img src={deleteImage} alt="delete" /> delete
          </button>
          <button className="edit btn">
            <img src={editImage} alt="edit" /> edit
          </button>
        </div>
        <div className="comment-body">{comment.content}</div>
      </div>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply reply={reply} key={reply.id} />
        ))}
      </div>
    </div>
  );
}

export default UserComment;
