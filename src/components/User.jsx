import userImage from '../images/avatars/image-juliusomo.png'

function User() {
    return (
        <div className='user'>
            <img className='user--img' src={userImage} alt='user' />
            <textarea className='user--textarea' placeholder='Add a comment...' />
            <button className='user--btn'>SEND</button>
        </div>
    )
}

export default User