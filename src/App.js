import React, { useState } from "react";
import Comment from "./components/Comment";
import User from "./components/User";
import jsonData from "./data.json";

function App() {
  const [comments, setComments] = useState(jsonData.comments);

  return (
    <div className="App">
      <div className="comments">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <User comments={comments} setComments={setComments} />
    </div>
  );
}

export default App;
