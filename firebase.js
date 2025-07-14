// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYuHUvMwdLG4LyCQI7NicZQU3G1hmfG4I",
    authDomain: "pwa-2-fec6b.firebaseapp.com",
    projectId: "pwa-2-fec6b",
    storageBucket: "pwa-2-fec6b.appspot.com",
    messagingSenderId: "634581794768",
    appId: "1:634581794768:web:979a7c0fe89217f11f43d5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign-Up Functionality
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert('Sign-up successful!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Login Functionality
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Login successful!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Logout Functionality
function logout() {
    auth.signOut().then(() => {
        alert('Logged out successfully!');
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
}
