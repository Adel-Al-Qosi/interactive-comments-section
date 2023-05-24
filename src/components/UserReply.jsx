import { useEffect, useState } from "react";
import editImage from "../images/icon-edit.svg";
import deleteImage from "../images/icon-delete.svg";

function UserReply({reply}) {
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
      import(`../images/avatars/image-${reply.user.username}.png`)
        .then((image) => setUserImage(image.default))
        .catch((error) =>
          console.error("Error during dynamic image import:", error)
        );
    }, [reply.user.username]);
    
    return (
        <div className="reply">
            <div className="reply-score">
          <button className="reply-score--plus">
            <span className="sr-only">score plus</span>
          </button>
          <p className="reply-score--score">{reply.score}</p>
          <button className="reply-score--minus">
            <span className="sr-only">score minus</span>
          </button>
        </div>

        <div className="reply-header">
          <div className="reply-header--user">
            <img src={userImage} alt="user" />
          </div>
          <h2>{reply.user.username}</h2>
          <p id="reply-header--you">you</p>
          <p>{reply.createdAt}</p>
        </div>
        <div className="comment-header--reply-btn">
          <button className="delete btn"> <img src={deleteImage} alt="delete" /> delete</button>
          <button className="edit btn"> <img src={editImage} alt="edit" />  edit</button>
        </div>
        <div className="reply-body"><span className="reply-to">@{reply.replyingTo}</span> {reply.content}</div>
        </div>
    )
}

export default UserReply