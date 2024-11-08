// User state management
function closeview() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.thank-you').style.display = 'block';
}
let isLoggedIn = false;
let currentUser = null;
//Onvisisble
function  Visibon() {
    document.getElementById('dashboard').innerHTML.style.display = 'block';
}
// Theme management
function setTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--bg', '#24243e');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--gradient', 'linear-gradient(to right, #24243e, #302b63, #0f0c29)');
        document.getElementById('sw').style.display = 'none';
        document.getElementById('sw1').style.display = 'block';
    } else {
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--text', '#24243e');
        root.style.setProperty('--gradient', 'linear-gradient(to right, #e0e0e0, #ffffff, #e0e0e0)');
        document.getElementById('sw').style.display = 'block';
        document.getElementById('sw1').style.display = 'none';
    }
    localStorage.setItem('theme', theme);
}

// Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    if (sectionId === 'login' && isLoggedIn) {
        sectionId = 'dashboard';
    }

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Handle auth-required sections
    if (targetSection && targetSection.classList.contains('auth-required') && !isLoggedIn) {
        showSection('login');
        return;
    }
}

// Authentication
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Store user data (in production, this would be handled securely)
    localStorage.setItem('user', JSON.stringify({ email }));
    isLoggedIn = true;
    currentUser = { email };

    // Update UI
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    showSection('dashboard');
}

function logout() {
    localStorage.removeItem('user');
    isLoggedIn = false;
    currentUser = null;
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
    showSection('home');
}

// Contact form
function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    // In production, this would send the message to a server
    alert('Message sent successfully!');
    form.reset();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Check for saved user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    }

    // Show initial section
    showSection('home');
});