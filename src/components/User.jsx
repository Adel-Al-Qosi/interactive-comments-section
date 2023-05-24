import { useEffect, useState, useContext } from 'react';
import userImage from '../images/avatars/image-juliusomo.png';
import { IdContext } from './IdProvider';

function User({ comments, setComments }) {
  const [text, setText] = useState('');
  const { newId, setNewId } = useContext(IdContext);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    let comment = null;

    if (text.length > 0) {
      comment = {
        id: newId,
        content: text,
        createdAt: 'Just now',
        score: 0,
        user: {
          username: 'juliusomo',
        },
        replies: [],
      };
    }

    setNewComment(comment);
  }, [text, newId]);

  const handleSend = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewId(newId + 1);
    }
    setText('');

  };

  return (
    <div className='user'>
      <img className='user--img' src={userImage} alt='user' />
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className='user--textarea'
        placeholder='Add a comment...'
      />
      <button onClick={handleSend} className='user--btn'>
        SEND
      </button>
    </div>
  );
}

export default User;
