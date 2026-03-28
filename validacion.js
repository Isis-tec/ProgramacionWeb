// Obtener elementos del DOM
const form = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Elementos de error (ahora son cajas)
const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorPassword = document.getElementById('errorPassword');
const errorConfirm = document.getElementById('errorConfirm');
const mensajeExito = document.getElementById('mensajeExito');

// Validar formato de correo usando expresión regular
function validarCorreo(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validar contraseña: mínimo 8 caracteres, una letra y un número
function validarPassword(pass) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
}

// Función para mostrar error en una caja
function mostrarError(elementoError, mensaje) {
    elementoError.textContent = mensaje;
    elementoError.classList.add('show');
}

// Función para ocultar error en una caja
function ocultarError(elementoError) {
    elementoError.textContent = '';
    elementoError.classList.remove('show');
}

// Evento submit del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita envío si hay errores

    let valido = true;

    // Ocultar mensaje de éxito al iniciar validación
    mensajeExito.classList.remove('show');

    // Limpiar todos los errores previos
    ocultarError(errorNombre);
    ocultarError(errorCorreo);
    ocultarError(errorPassword);
    ocultarError(errorConfirm);

    // Validar nombre
    if (nombre.value.trim() === '') {
        mostrarError(errorNombre, 'El nombre es obligatorio');
        valido = false;
    }

    // Validar correo
    if (correo.value.trim() === '') {
        mostrarError(errorCorreo, 'El correo es obligatorio');
        valido = false;
    } else if (!validarCorreo(correo.value)) {
        mostrarError(errorCorreo, 'Formato de correo inválido');
        valido = false;
    }

    // Validar contraseña
    if (password.value.trim() === '') {
        mostrarError(errorPassword, 'La contraseña es obligatoria');
        valido = false;
    } else if (!validarPassword(password.value)) {
        mostrarError(errorPassword, 'Debe tener al menos 8 caracteres, una letra y un número');
        valido = false;
    }

    // Validar confirmación
    if (confirmPassword.value.trim() === '') {
        mostrarError(errorConfirm, 'Confirma tu contraseña');
        valido = false;
    } else if (password.value !== confirmPassword.value) {
        mostrarError(errorConfirm, 'Las contraseñas no coinciden');
        valido = false;
    }

    // Si todo es correcto ✅
    if (valido) {
        mensajeExito.classList.add('show'); // Mostrar caja de éxito
        form.reset(); // Limpiar formulario
        
        // Opcional: ocultar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
            mensajeExito.classList.remove('show');
        }, 5000);
    }
});

// Validación en tiempo real (solo limpia errores del campo que se está editando)
[nombre, correo, password, confirmPassword].forEach(campo => {
    campo.addEventListener('input', function() {
        // Mapeo de campos a sus errores correspondientes
        const errores = {
            'nombre': errorNombre,
            'correo': errorCorreo,
            'password': errorPassword,
            'confirmPassword': errorConfirm
        };
        
        // Ocultar el error del campo que se está escribiendo
        if (errores[campo.id]) {
            ocultarError(errores[campo.id]);
        }
        
        // Ocultar mensaje de éxito si el usuario sigue editando
        mensajeExito.classList.remove('show');
    });
    
    // También validar cuando el campo pierde el foco (blur)
    campo.addEventListener('blur', function() {
        form.dispatchEvent(new Event('submit'));
    });
});