import { useEffect, useState } from "react";
import replyImage from "../images/icon-reply.svg";

function Reply({reply}) {
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
          <p>{reply.createdAt}</p>
        </div>
        <button className="reply-header--reply-btn">
          <img src={replyImage} alt="reply" />
          Reply
        </button>
        <div className="reply-body">{reply.content}</div>
        </div>
    )
}

export default Reply