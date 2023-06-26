import React from 'react';
import ChatBubble from './ChatBubble';
function MessageList({ messages }) {
  return (
    <div className="message-container">
      {messages.map((message, index) => (
       <ChatBubble key={index} type={message.type} text={message.text}/>
      ))}
    </div>
  );
}

export default MessageList;