import { useContext, useEffect, useState } from 'react';
import userImage from '../images/avatars/image-juliusomo.png';
import { IdContext } from './IdProvider';

function ReplyOnComment({ setOpenReply, name, replies, setReplies }) {
  const [text, setText] = useState('');
  const { newId, setNewId } = useContext(IdContext);
  const [newReply, setNewReply] = useState(null);

  useEffect(() => {
    if (text.length > 0) {
      setNewReply({
        id: newId,
        content: text,
        createdAt: 'Just now',
        score: 0,
        replyingTo: name,
        user: {
          username: 'juliusomo',
        },
      });
    } else {
      setNewReply(null);
    }
    setNewId(newId + 1);
  }, [text, newId, setNewId, name, setNewReply]);

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
          setOpenReply(false)
          if (newReply) setReplies([...replies, newReply]);
          setText('');
        }}
        className='user--btn'
      >
        REPLY
      </button>
    </div>
  );
}

export default ReplyOnComment;
