document.addEventListener('DOMContentLoaded', function() {

    const demoUser = {
        name: "lokesh sahu",
        email: "loki@gmail.com",
        password: "123456"
    };

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginMessage = document.querySelector('#loginForm .message');
    const signupMessage = document.querySelector('#signupForm .message');

    loginBtn.addEventListener('click', function() {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        clearMessages();
    });

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        clearMessages();
    });

    function clearMessages() {
        loginMessage.textContent = '';
        signupMessage.textContent = '';
        loginMessage.className = 'message';
        signupMessage.className = 'message';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showMessage(loginMessage, 'Please fill all fields', 'error');
            return;
        }

        // Check with demo user
        if (email === demoUser.email && password === demoUser.password) {
            showMessage(loginMessage, `Welcome back, ${demoUser.name}! Login successful.`, 'success');
            loginForm.reset();
        } else {
            showMessage(loginMessage, 'Invalid email or password. Try: john@example.com / 123456', 'error');
        }
    });

    // Signup functionality (demo only - won't save)
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showMessage(signupMessage, 'Please fill all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(signupMessage, 'Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage(signupMessage, 'Password must be at least 6 characters', 'error');
            return;
        }

        // Demo message (no actual save)
        showMessage(signupMessage, `Demo: Account created for ${name}! But login with demo user only.`, 'success');
        
        // Clear form
        signupForm.reset();
        
        // Switch to login after 2 seconds
        setTimeout(() => {
            loginBtn.click();
            showMessage(loginMessage, 'Use demo credentials: john@example.com / 123456', 'success');
        }, 2000);
    });

    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `message ${type}`;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            if (element.textContent === text) {
                element.textContent = '';
                element.className = 'message';
            }
        }, 3000);
    }

});