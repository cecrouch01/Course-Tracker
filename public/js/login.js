document.addEventListener('DOMContentLoaded', function() {
    const signupFields = document.querySelectorAll('.signup-field');

    // JavaScript to handle the toggle action
    document.getElementById('toggle-form').addEventListener('click', function(event) {
        event.preventDefault();
        const formTitle = document.getElementById('form-title');
        
        if (formTitle.textContent === 'Login') {
            formTitle.textContent = 'Sign Up';
            document.getElementById('toggle-form').textContent = 'Switch to Login';
            signupFields.forEach(field => field.style.display = 'block');
            
            // Update hidden field value to sign-up
            document.getElementById('form-action').value = 'signup';
        } else {
            formTitle.textContent = 'Login';
            document.getElementById('toggle-form').textContent = 'Switch to Sign Up';
            signupFields.forEach(field => field.style.display = 'none');
            
            // Update hidden field value to login
            document.getElementById('form-action').value = 'login';
        }
    });

    // Handle form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        const action = document.getElementById('form-action').value;

        if (action === 'signup') {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                event.preventDefault(); // prevent form submission
            }
        }
    });

    console.log("Initial state of signup fields:", signupFields[0].style.display);
});

console.log("Script loaded");
