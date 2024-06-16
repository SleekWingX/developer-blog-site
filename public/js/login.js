document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop form submission
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();

if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
});