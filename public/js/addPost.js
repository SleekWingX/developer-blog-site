document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop form submission
const title = document.getElementById('title').value.trim();
const content = document.getElementById('content').value.trim();
if (title && content) {
    const response = await fetch('/api/posts/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        } ,
        body: JSON.stringify({
            title, content
        })
    })

    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
}
});