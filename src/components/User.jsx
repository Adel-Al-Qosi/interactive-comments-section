import { useEffect, useState, useContext } from 'react';
import userImage from '../images/avatars/image-juliusomo.png';
import { IdContext } from './IdProvider';

function User({ comments, setComments }) {
  const [text, setText] = useState('');
  const {newId, setNewId} = useContext(IdContext)
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    if (text.length > 0) {
        setNewComment({
            id: newId,
            content: text,
            createdAt: 'Just now',
            score: 0,
            user: {
              username: 'juliusomo',
            },
            replies: [],
          });
    } else {
        setNewComment(null)
    }
    setNewId(newId + 1);
  }, [text, newId, setNewId]);

  return (
    <div className='user'>
      <img className='user--img' src={userImage} alt='user' />
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className='user--textarea'
        placeholder='Add a comment...'
      />
      <button
        onClick={() => {
            if (newComment) setComments([...comments, newComment])
            setText('')
        }}
        className='user--btn'
      >
        SEND
      </button>
    </div>
  );
}

export default User;
