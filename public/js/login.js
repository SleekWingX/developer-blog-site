document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop form submission
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();

     await fetch('/api/users/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        } ,
        body: JSON.stringify({
            username, password
        })
    })

    document.location.replace('/dashboard')

});