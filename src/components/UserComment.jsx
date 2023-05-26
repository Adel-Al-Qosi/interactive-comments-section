import { useEffect, useState } from "react";
import editImage from "../images/icon-edit.svg";
import deleteImage from "../images/icon-delete.svg";
import UserReply from "./UserReply";
import fallbackImage from "../images/avatars/image-juliusomo.png";

function UserComment({ comment, comments, setComments }) {
  const [userImage, setUserImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(
          `../images/avatars/image-${comment.user.username}.png`
        );
        setUserImage(image.default);
      } catch (error) {
        console.error("Error during dynamic image import:", error);
        setUserImage(fallbackImage);
      }
    };

    loadImage();
  }, [comment.user.username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (editedContent !== comment.content) {
      const updatedComment = { ...comment, content: editedContent };
      const commentIndex = comments.findIndex((c) => c.id === comment.id);

      const updatedComments = [
        ...comments.slice(0, commentIndex),
        updatedComment,
        ...comments.slice(commentIndex + 1),
      ];

      setComments(updatedComments);
    }

    setEditing(false);
  };

  const handleDelete = () => {
    if (comments && comments.length > 0) {
      const updatedComments = comments.filter((c) => c.id !== comment.id);
      setComments(updatedComments);
    }
  };

  const handleDeleteReply = (replyId) => {
    const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
  
    const updatedComment = {
      ...comment,
      replies: updatedReplies
    };
  
    const commentIndex = comments.findIndex((c) => c.id === comment.id);
    const updatedComments = [
      ...comments.slice(0, commentIndex),
      updatedComment,
      ...comments.slice(commentIndex + 1),
    ];
  
    setComments(updatedComments);
  };
  
  

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
          {comment.user.isCurrentUser && (
            <p className="comment-header--you">you</p>
          )}
          <p>{comment.createdAt}</p>
        </div>

        <div className="comment-header--reply-btn">
          <button className="delete btn" onClick={handleDelete}>
            <img src={deleteImage} alt="delete" /> delete
          </button>
          {editing ? (
            <button className="edit btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit btn" onClick={handleEdit}>
              <img src={editImage} alt="edit" /> edit
            </button>
          )}
        </div>

        <div className="comment-body">
          {editing ? (
            <textarea
              className="user--textarea"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            comment.content
          )}
        </div>
      </div>

      <div className="replies">
        {comment.replies.map((reply) => (
          <UserReply
            reply={reply}
            key={reply.id}
            onDelete={handleDeleteReply}
          />
        ))}
      </div>
    </div>
  );
}

export default UserComment;
