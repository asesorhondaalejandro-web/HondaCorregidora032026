import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "../../js/config.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const leadsContainer = document.getElementById('leadsContainer');
const userEmailDisplay = document.getElementById('userEmail');

// 1. Proteger la ruta: Si no hay usuario, mandarlo al login
onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmailDisplay.innerText = `Asesor: ${user.email}`;
        loadLeads();
    } else {
        window.location.href = "../../auth.html";
    }
});

// 2. Cargar Leads en tiempo real
function loadLeads() {
    const q = query(collection(db, "leads"));
    
    // onSnapshot actualiza la pantalla automáticamente si algo cambia en la DB
    onSnapshot(q, (snapshot) => {
        leadsContainer.innerHTML = '';
        
        snapshot.forEach((doc) => {
            const lead = doc.data();
            const id = doc.id;
            
            // Creamos la tarjeta del lead
            const card = document.createElement('div');
            card.className = `lead-card status-${lead.status || 'nuevo'}`;
            
            // Estructura de la tarjeta
            card.innerHTML = `
                <div class="card-info">
                    <h3>${lead.nombre || 'Sin nombre'}</h3>
                    <p class="date">📅 ${lead.fecha_registro || 'S/F'}</p>
                    <p class="model">🚗 <strong>Interés:</strong> ${lead.modelo || 'No especificado'}</p>
                    <p class="source">📍 <strong>Origen:</strong> ${lead.fuente || 'Piso'}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-wa" onclick="window.open('https://wa.me/52${lead.whatsapp}', '_blank')">
                        💬 WhatsApp
                    </button>
                    <select onchange="updateLeadStatus('${id}', this.value)">
                        <option value="nuevo" ${lead.status === 'nuevo' ? 'selected' : ''}>Nuevo</option>
                        <option value="seguimiento" ${lead.status === 'seguimiento' ? 'selected' : ''}>Seguimiento</option>
                        <option value="vendido" ${lead.status === 'vendido' ? 'selected' : ''}>Vendido</option>
                    </select>
                </div>
            `;
            leadsContainer.appendChild(card);
        });
    });
}

// 3. Función global para actualizar estatus (usamos window para que el HTML la vea)
window.updateLeadStatus = async (id, newStatus) => {
    try {
        const leadRef = doc(db, "leads", id);
        await updateDoc(leadRef, { status: newStatus });
        console.log("Estatus actualizado");
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
};

// 4. Cerrar Sesión
document.getElementById('btnLogout').addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "../../index.html");
});