import React, { useState } from 'react';

function InputForm({ onSubmit }) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = () => {
    if (inputMessage.trim()) {
      onSubmit(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default InputForm;