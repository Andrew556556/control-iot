// Variable global para guardar la IP pública
let publicIP = "";

// Deshabilitar los botones mientras se obtiene la IP
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.disabled = true);

const movementStatus = document.getElementById('movement-status');
const speedRange = document.getElementById('speed-range');
const speedValue = document.getElementById('speed-value');

// Actualizar valor mostrado de velocidad
speedRange.addEventListener('input', () => {
    speedValue.textContent = speedRange.value;
});

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
        movementStatus.textContent = status;

        const payload = {
            ip: publicIP || "192.168.1.100",
            name: "Andrew Josue Vazquez",
            status: status,
            speed: parseInt(speedRange.value)
        };

        fetch('http://3.222.116.52:5000/api/devices', {
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

