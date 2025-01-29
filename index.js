const form = document.querySelector('form');
const input = document.getElementById('day-description');
const responseDiv = document.getElementById('response-to-day-description');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const formData = {
    description: input.value,
  };

  try {
    const response = await fetch('/your-api-endpoint', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    responseDiv.textContent = data.message; 

  } catch (error) {
    console.error('Error:', error);
    responseDiv.textContent = 'An error occurred.'; 
  }
});