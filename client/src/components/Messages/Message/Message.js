import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user === trimmedName;

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentTest pr-10'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentTest'>{user}</p>
    </div>
  );
};
export default Message;
