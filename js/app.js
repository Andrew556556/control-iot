// Variable global para guardar la IP pública
let publicIP = "";

// Deshabilitar los botones mientras se obtiene la IP
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.disabled = true);

const movementStatus = document.getElementById('movement-status');

// Función para obtener la IP pública
function fetchPublicIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo obtener la IP pública');
            return response.json();
        })
        .then(data => {
            publicIP = data.ip;
            console.log('IP pública obtenida:', publicIP);

            // Habilitar botones después de obtener IP
            buttons.forEach(btn => btn.disabled = false);
        })
        .catch(error => {
            console.error('Error al obtener la IP pública:', error);
        });
}

// Llamar a la función para obtener la IP al cargar la página
window.addEventListener('DOMContentLoaded', fetchPublicIP);

// Asignar eventos a los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const status = button.getAttribute('data-status');

        // Actualizar el texto en pantalla
        movementStatus.textContent = status;

        // ⚠️ Aquí se había eliminado la declaración del payload
        const payload = {
            ip: publicIP || "192.168.1.100",
            name: "Andrew Josue Vazquez",
            status: status
        };

        // Enviar la petición POST
        fetch('http://3.237.98.232:5000/api/devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la petición');
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
        })
        .catch(error => {
            console.error('Error al enviar la orden:', error);
        });
    });
});
