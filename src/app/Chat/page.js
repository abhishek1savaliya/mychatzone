'use client'
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://chatapplication-i1j5.onrender.com');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;
    
        setMessage('');
    
        try {

            await axios.post('https://chatapplication-i1j5.onrender.com/api/chat/send', {
                content: message,
                receiver: '66b09d42c4a850e6646a345d'
            }, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
        } catch (error) {

            setMessages((prevMessages) => prevMessages.filter(msg => msg !== newMessage));
            console.error('Error sending message:', error);
        }
    };
    

    return (
        <div className="bg-red-100 p-4 min-h-screen flex flex-col items-center">
            <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 border-b border-gray-300">{msg.content}</div>
                ))}
            </div>
            <div className="flex w-full max-w-lg">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                    className="flex-grow p-2 border border-red-500 rounded-l"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-red-500 text-white p-2 rounded-r hover:bg-red-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;