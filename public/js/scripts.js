document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");
    const commentForm = document.querySelector("#comment-form");

    // Function to post data to a specified path
    function postData(url = '', data = {}) {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => response.json());
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');
            postData('/api/users/login', { username, password })
                .then(data => {
                    console.log(data);
                    // Redirect or handle login success
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(signupForm);
            const username = formData.get('username');
            const password = formData.get('password');
            postData('/api/users/signup', { username, password })
                .then(data => {
                    console.log(data);
                    // Redirect or handle signup success
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (commentForm) {
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(commentForm);
            const content = formData.get('content');
            const postId = formData.get('postId');
            postData('/api/comments', { content, postId })
                .then(data => {
                    console.log(data);
                    // Handle comment success (e.g., clear form, display the new comment)
                })
                .catch(error => console.error('Error:', error));
        });
    }
});
