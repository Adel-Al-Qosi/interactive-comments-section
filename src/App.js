import React, { useState } from "react";
import Comment from "./components/Comment";
import User from "./components/User";
import jsonData from "./data.json";
import UserComment from "./components/UserComment";
import { IdProvider } from "./components/IdProvider";

function App() {
  const [comments, setComments] = useState(jsonData.comments);
  
  // const handleDeleteComment = (commentId) => {
  //   const updatedComments = comments.filter((comment) => comment.id !== commentId);
  //   setComments(updatedComments);
  // };

  return (
    <div className="App">
      <div className="comments">
        {comments.map((comment) => {
          return comment.user.username === jsonData.currentUser.username ? (
            <UserComment
              comment={comment}
              key={comment.id}
              comments={comments}
              setComments={setComments}
              // handleDeleteComment={handleDeleteComment}
            />
          ) : (
            <Comment comment={comment} key={comment.id} />
          );
        })}
      </div>
      <User comments={comments} setComments={setComments} />
    </div>
  );
}

const Root = () => {
  return (
    <IdProvider>
      <App />
    </IdProvider>
  );
};

export default Root;
