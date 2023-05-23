import { useEffect, useState } from "react";
import editImage from "../images/icon-edit.svg";
import deleteImage from "../images/icon-delete.svg";
import Reply from "./Reply";

function UserComment({ comment }) {
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
          <h2>{comment.user.username} </h2>
          <p className="comment-header--you">you</p>
          <p>{comment.createdAt}</p>
        </div>
        <div className="comment-header--reply-btn">
          <button className="delete btn"> <img src={deleteImage} alt="delete" /> delete</button>
          <button className="edit btn"> <img src={editImage} alt="edit" />  edit</button>
        </div>
        <div className="comment-body">{comment.content}</div>
      </div>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply reply={reply} />
        ))}
      </div>
    </div>
  );
}

export default UserComment;
