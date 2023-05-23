import React, { useState } from "react";
import Comment from "./components/Comment";
import User from "./components/User";
import jsonData from "./data.json";
import UserComment from "./components/UserComment";

function App() {
  const [comments, setComments] = useState(jsonData.comments);

  return (
    <div className="App">
      <div className="comments">
        {comments.map((comment) => {
          return (
          comment.user.username === jsonData.currentUser.username ?
          <UserComment comment={comment} key={comment.id} /> :
          <Comment comment={comment} key={comment.id} />
        )})}
      </div>
      <User comments={comments} setComments={setComments} />
    </div>
  );
}

const Root = () => {
  return <App />
}

export default Root;
