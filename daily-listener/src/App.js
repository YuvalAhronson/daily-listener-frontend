import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data.message);

    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred.');
    }
  };

  return (
    <div className="container"> 
      <h1 className="title">Daily Listener</h1> 
      <form onSubmit={handleSubmit}> 
        <label htmlFor="day-description">How was your day?</label> 
        <input 
          type="text" 
          id="day-description" 
          name="day-description" 
          value={description} 
          onChange={(event) => setDescription(event.target.value)} 
        />
        <button type="submit">Tell me :)</button>
      </form>
      <div className="response">{response}</div> 
    </div>
  );
}

export default App;