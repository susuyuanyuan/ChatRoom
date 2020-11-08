import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';
    const socket = io(ENDPOINT);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search, {
            ignoreQueryPrefix: true
        });
        setRoom(room);
        setName(name);

        socket.emit('join', { name, room });
    }, [ENDPOINT, location.search]);

    // useEffect(() => {
    //     socket.on('message', message => {
    //         setMessages([...messages, message]);
    //     })
    // }, [messages]);

    // const sendMessage = e => {
    //     e.preventDefault();

    //     if (message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     };
    // }
    // console.log(message, messages);
    return (
        <div className="outerContainer">
            <p>wwwwwww</p>
        </div>
    );
};

export default Chat;