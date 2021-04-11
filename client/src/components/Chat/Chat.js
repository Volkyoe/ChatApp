import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

const Chat = ({ location }) => {
  const ENDPOINT = 'http://localhost:5000';

  const { current: socket } = useRef(
    io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    })
  );

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
        window.location.assign('/');
      }
    });

    return () => socket.disconnect();
  }, [location.search, socket]);

  useEffect(() => {
    socket.once('message', (message) => setMessages([...messages, message]));
  }, [messages, socket]);

  useEffect(() => {
    socket.once('roomData', ({ users }) => setUsers(users));
  }, [users, socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) socket.emit('sendMessage', message, () => setMessage(''));
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
