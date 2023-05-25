import React, { useState, useEffect } from "react";
import editImage from "../images/icon-edit.svg";
import deleteImage from "../images/icon-delete.svg";

function UserReply({ reply, onDelete }) {
  const [userImage, setUserImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  useEffect(() => {
    import(`../images/avatars/image-${reply.user.username}.png`)
      .then((image) => setUserImage(image.default))
      .catch((error) =>
        console.error("Error during dynamic image import:", error)
      );
  }, [reply.user.username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    reply.content = editedContent;

    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(reply.id);
  };

  return (
    <div className="reply">
      <div className="reply-header">
        <div className="reply-header--user">
          <img src={userImage} alt="user" />
        </div>
        <h2>{reply.user.username}</h2>
        {editing ? <p id="reply-header--you">you</p> : null}
        <p>{reply.createdAt}</p>
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
      <div className="reply-body">
        {editing ? (
          <>
            <span className="reply-to">@{reply.replyingTo} </span>
            <textarea
              className="user--textarea"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className="reply-to">@{reply.replyingTo} </span>
            {reply.content}
          </>
        )}
      </div>
    </div>
  );
}

export default UserReply;
