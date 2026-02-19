import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "./config.js";

// 1. Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Elementos de la Interfaz
const loginForm = document.getElementById('loginForm');
const roleDisplay = document.getElementById('roleDisplay');

// 3. Detectar Rol desde la URL (?role=agent, ?role=receptionist, etc.)
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get('role') || 'receptionist';

// Mostrar visualmente en qué portal estamos
if (roleDisplay) {
    const rolesFriendly = {
        'receptionist': 'Recepcionista',
        'agent': 'Agente de Ventas',
        'supervisor': 'Supervisor'
    };
    roleDisplay.innerText = `Portal de Acceso: ${rolesFriendly[role] || role}`;
}

// 4. Manejo del Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('btnLogin');

        // Feedback visual simple
        btn.innerText = "Cargando...";
        btn.disabled = true;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Si el login es exitoso, redirigimos según el rol
            window.location.href = `modules/${role}/index.html`;
        } catch (error) {
            console.error("Error de Auth:", error.code);
            alert("Error: Usuario o contraseña incorrectos.");
            btn.innerText = "Entrar al Sistema";
            btn.disabled = false;
        }
    });
}

// 5. Verificación de sesión activa (Opcional pero útil)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Sesión activa de:", user.email);
    }
});