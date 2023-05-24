import { useEffect, useState } from "react";
import replyImage from "../images/icon-reply.svg";
import ReplyOnReplies from "./replayOnReplies";

function Reply({ reply, replies, setReplies }) {
  const [userImage, setUserImage] = useState(null);
  const [replyOn, setReplyOn] = useState(false);

  useEffect(() => {
    import(`../images/avatars/image-${reply.user.username}.png`)
      .then((image) => setUserImage(image.default))
      .catch((error) =>
        console.error("Error during dynamic image import:", error)
      );
  }, [reply.user.username]);

  const handleReplyClick = () => {
    setReplyOn(!replyOn);
  };

  return (
    <>
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
        <div className="reply-header--reply-btn">
          <button className="btn edit" onClick={handleReplyClick}>
            <img src={replyImage} alt="reply" />
            Reply
          </button>
        </div>
        <div className="reply-body">
          <span className="reply-to">@{reply.replyingTo}</span> {reply.content}
        </div>
      </div>
      {replyOn && (
        <ReplyOnReplies
          name={reply.user.username}
          replies={replies}
          setReplies={setReplies}
          setReplyOn={setReplyOn}
        />
      )}
    </>
  );
}

export default Reply;
