import { useEffect, useState } from "react";

function Comment({ comment }) {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    import(`../images/avatars/image-${comment.user.username}.png`)
      .then((image) => setUserImage(image.default))
      .catch((error) => console.error("Error during dynamic image import:", error));
  }, [comment.user.username]);

  return (
    <div className="comment">
      <div className="comment-score">
        <button className="comment-score--plus">+</button>
        <p className="comment-score--score">{comment.score}</p>
        <button className="comment-score--minus">-</button>
      </div>

      <div className="comment-header">
        <div className="comment-header--user">
          <img src={userImage} alt="user" />
        </div>
      </div>
        <button className="comment-header--reply">Reply</button>
      <div className="comment-body">{comment.content}</div>
    </div>
  );
}

export default Comment;
