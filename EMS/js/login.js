document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Display loading message or disable button
        loginMessage.classList.remove('d-none', 'alert-danger', 'alert-success');
        loginMessage.classList.add('alert-info');
        loginMessage.textContent = 'Logging in...';
        document.querySelector('button[type="submit"]').disabled = true;

        try {
            // **Important:** Replace with your actual backend API endpoint
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                loginMessage.classList.remove('alert-info');
                loginMessage.classList.add('alert-success');
                loginMessage.textContent = 'Login successful! Redirecting...';

                // --- IMPORTANT CHANGE HERE ---
                // Store the session ID instead of 'jwt_token'
                // Assuming your backend now returns a 'sessionId' field in its JSON response
                if (data.sessionId) {
                    localStorage.setItem('session_id', data.sessionId);
                } else {
                    // Fallback if 'sessionId' is not explicitly named, maybe it's just 'token'
                    // but you're treating it as an opaque ID, not a JWT.
                    console.warn("Backend response for login successful, but 'sessionId' field not found. Looking for 'token'.");
                    localStorage.setItem('session_id', data.token); // Use 'token' if 'sessionId' isn't present
                }
                
                localStorage.setItem('user_role', data.role); // Still store the user role

                // Redirect based on role
                if (data.role === 'admin') {
                    window.location.href = 'admin_dashboard.html'; // Admin dashboard
                } else if (data.role === 'employee') {
                    window.location.href = 'employee_dashboard.html'; // Employee dashboard
                } else {
                    // Fallback or error for unknown role
                    loginMessage.classList.remove('alert-success');
                    loginMessage.classList.add('alert-danger');
                    loginMessage.textContent = 'Login successful, but unknown role. Please contact support.';
                    // Potentially log out if role is invalid
                    localStorage.clear();
                }

            } else {
                // Login failed
                loginMessage.classList.remove('alert-info', 'alert-success');
                loginMessage.classList.add('alert-danger');
                loginMessage.textContent = data.msg || 'Invalid username or password.';
            }
        } catch (error) {
            console.error('Error during login:', error);
            loginMessage.classList.remove('alert-info', 'alert-success');
            loginMessage.classList.add('alert-danger');
            loginMessage.textContent = 'An error occurred. Please try again later.';
        } finally {
            // Re-enable button
            document.querySelector('button[type="submit"]').disabled = false;
            loginMessage.classList.remove('d-none'); // Ensure message is visible
        }
    });
});