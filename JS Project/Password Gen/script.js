// ===== DOM Elements =====
const passwordInput = document.getElementById('password');
const generateBtn   = document.getElementById('generateBtn');
const copyBtn       = document.getElementById('copyBtn');
const lengthSlider  = document.getElementById('lengthSlider');
const lengthValue   = document.getElementById('lengthValue');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck   = document.getElementById('numbers');
const symbolsCheck   = document.getElementById('symbols');
const strengthFill   = document.getElementById('strengthFill');
const strengthText   = document.getElementById('strengthText');
const toast          = document.getElementById('toast');

// ===== Character Sets =====
const CHARS = {
    uppercase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase : 'abcdefghijklmnopqrstuvwxyz',
    numbers   : '0123456789',
    symbols   : '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// ===== Update Length Display =====
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// ===== Generate Password =====
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charPool       = '';
    let guaranteedChars = '';

    if (uppercaseCheck.checked) {
        charPool += CHARS.uppercase;
        guaranteedChars += getRandomChar(CHARS.uppercase);
    }
    if (lowercaseCheck.checked) {
        charPool += CHARS.lowercase;
        guaranteedChars += getRandomChar(CHARS.lowercase);
    }
    if (numbersCheck.checked) {
        charPool += CHARS.numbers;
        guaranteedChars += getRandomChar(CHARS.numbers);
    }
    if (symbolsCheck.checked) {
        charPool += CHARS.symbols;
        guaranteedChars += getRandomChar(CHARS.symbols);
    }

    if (charPool === '') {
        alert('⚠️ Please select at least one character type!');
        return;
    }

    let password = guaranteedChars;
    for (let i = guaranteedChars.length; i < length; i++) {
        password += getRandomChar(charPool);
    }

    password = shuffleString(password);
    passwordInput.value = password;
    updateStrength(password);
}

// ===== Helpers =====
function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

// ===== Strength Indicator =====
function updateStrength(password) {
    let score = 0;
    if (password.length >= 8)          score++;
    if (password.length >= 12)         score++;
    if (password.length >= 16)         score++;
    if (/[A-Z]/.test(password))        score++;
    if (/[a-z]/.test(password))        score++;
    if (/[0-9]/.test(password))        score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        { min: 0, max: 2, label: 'Weak',   color: '#ff4444', width: '25%'  },
        { min: 3, max: 4, label: 'Fair',   color: '#ff9800', width: '50%'  },
        { min: 5, max: 5, label: 'Good',   color: '#2196f3', width: '75%'  },
        { min: 6, max: 7, label: 'Strong', color: '#00c853', width: '100%' },
    ];

    const level = levels.find(l => score >= l.min && score <= l.max)
                  || levels[levels.length - 1];

    strengthFill.style.width      = level.width;
    strengthFill.style.background = level.color;
    strengthText.textContent      = level.label;
    strengthText.style.color      = level.color;
}

// ===== Copy Password =====
function copyPassword() {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => showToast())
        .catch(() => {
            passwordInput.select();
            document.execCommand('copy');
            showToast();
        });
}

// ===== Toast =====
function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Event Listeners =====
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Auto-generate on load
window.addEventListener('load', generatePassword);