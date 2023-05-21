import User from "./components/User";
import data from "./data.json"
import Comment from "./components/Comment"

const comments = data.comments

function App() {
  return (
    <div className="App">
      <div className="comments">
        {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
      </div>
      <User />
    </div>
  );
}

function Root() {
  return <App />;
}

export default Root;
