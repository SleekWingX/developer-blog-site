document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop form submission
const name = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();
const email = document.getElementById('email').value.trim();
console.log("User",username,password,email)
if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
});