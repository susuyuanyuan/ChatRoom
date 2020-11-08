import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = ({ history }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (name && room) {
            history.push('/chat');
        }
    }
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading"></h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={e => setRoom(e.target.value)} />
                </div>
                <div>
                    <button className="button mt-20" type="submit" onClick={onSubmit}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Join;