import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Response = styled.div`
  margin-top: 20px; 
`;

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
    <Container>
      <Title>Daily Listener</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="day-description">How was your day?</Label> 
        <Input 
          type="text" 
          id="day-description" 
          name="day-description" 
          value={description} 
          onChange={(event) => setDescription(event.target.value)} 
        />
        <Button type="submit">Tell me :)</Button>
      </Form>
      <Response>{response}</Response> 
    </Container>
  );
}

export default App;