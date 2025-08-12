// Configuración de FRIOCAS Web
// Este archivo permite personalizar fácilmente la página web

const CONFIG = {
    // Información de la empresa
    empresa: {
        nombre: "FRIOCAS",
        descripcion: "Tu proveedor confiable de repuestos y servicios técnicos",
        telefono: "+5493795015712",
        email: "carla.crimi.95@gmail.com",
        direccion: "Moreno 2242, Corrientes Capital, Argentina",
        anioFundacion: "2020"
    },

    // Configuración de colores (puedes cambiar estos valores)
    colores: {
        primaryBlue: "#1e3a8a",    // Azul principal
        secondaryBlue: "#3b82f6",  // Azul secundario
        lightBlue: "#60a5fa",      // Azul claro
        skyBlue: "#87ceeb"         // Celeste
    },

    // Configuración de pagos
    pagos: {
        habilitarCredito: true,
        habilitarDebito: true,
        habilitarEfectivo: true,
        habilitarTransferencias: true,
    },
    // Configuración de categorías
    categorias: {
        motor: "Motor",
        frenos: "Frenos",
        suspension: "Suspensión",
        electrico: "Eléctrico"
    },

    // Configuración de la interfaz
    interfaz: {
        mostrarStock: true,
        mostrarCategorias: true,
        habilitarBusqueda: true,
        animaciones: true,
        modoOscuro: true 
    },

    // Configuración de notificaciones
    notificaciones: {
        duracion: 3000, // milisegundos
        posicion: "top-right", // top-right, top-left, bottom-right, bottom-left
        sonido: true
    },

    // Configuración de seguridad
    seguridad: {
        validarEmail: true,
        validarTelefono: true,
        formatearTarjeta: true,
        encriptarDatos: false // Solo para demostración
    }
};

// Función para aplicar configuración
function aplicarConfiguracion() {
    // Aplicar colores CSS
    const root = document.documentElement;
    root.style.setProperty('--primary-blue', CONFIG.colores.primaryBlue);
    root.style.setProperty('--secondary-blue', CONFIG.colores.secondaryBlue);
    root.style.setProperty('--light-blue', CONFIG.colores.lightBlue);
    root.style.setProperty('--sky-blue', CONFIG.colores.skyBlue);

    // Actualizar información de la empresa
    actualizarInformacionEmpresa();
    
    // Configurar métodos de pago
    configurarMetodosPago();
    
    // Configurar interfaz
    configurarInterfaz();
}

// Actualizar información de la empresa en la página
function actualizarInformacionEmpresa() {
    // Actualizar título
    document.title = `${CONFIG.empresa.nombre} - Repuestos y Servicios`;
    
    // Actualizar header
    const navBrand = document.querySelector('.nav-brand h1');
    if (navBrand) {
        navBrand.innerHTML = `<i class="fas fa-cogs"></i> ${CONFIG.empresa.nombre}`;
    }
    
    // Actualizar hero section
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = `Bienvenido a ${CONFIG.empresa.nombre}`;
    }
    
    const heroDesc = document.querySelector('.hero-content p');
    if (heroDesc) {
        heroDesc.textContent = CONFIG.empresa.descripcion;
    }
    
    // Actualizar footer
    actualizarFooter();
}

// Actualizar footer con información de la empresa
function actualizarFooter() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach(section => {
        const h3 = section.querySelector('h3');
        if (h3 && h3.textContent === 'FRIOCAS') {
            h3.textContent = CONFIG.empresa.nombre;
            const p = section.querySelector('p');
            if (p) {
                p.textContent = `${CONFIG.empresa.descripcion} desde ${CONFIG.empresa.anioFundacion}.`;
            }
        }
        
        if (h3 && h3.textContent === 'Contacto') {
            const contactInfo = section.querySelectorAll('p');
            if (contactInfo.length >= 3) {
                contactInfo[0].innerHTML = `<i class="fas fa-phone"></i> ${CONFIG.empresa.telefono}`;
                contactInfo[1].innerHTML = `<i class="fas fa-envelope"></i> ${CONFIG.empresa.email}`;
                contactInfo[2].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${CONFIG.empresa.direccion}`;
            }
        }
    });
    
    // Actualizar copyright
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.innerHTML = `&copy; ${new Date().getFullYear()} ${CONFIG.empresa.nombre}. Todos los derechos reservados.`;
    }
}

// Configurar métodos de pago según la configuración
function configurarMetodosPago() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        const input = option.querySelector('input');
        const method = input.value;
        
        switch (method) {
            case 'credito':
                input.disabled = !CONFIG.pagos.habilitarCredito;
                option.style.opacity = CONFIG.pagos.habilitarCredito ? '1' : '0.5';
                break;
            case 'debito':
                input.disabled = !CONFIG.pagos.habilitarDebito;
                option.style.opacity = CONFIG.pagos.habilitarDebito ? '1' : '0.5';
                break;
            case 'efectivo, transferencia':
                input.disabled = !CONFIG.pagos.habilitarEfectivo;
                option.style.opacity = CONFIG.pagos.habilitarEfectivo ? '1' : '0.5';
                const label = option.querySelector('span') || option.lastChild;
                if (label && label.textContent.includes('Efectivo')) {
                    label.textContent = `Efectivo (${CONFIG.pagos.procesadorEfectivo})`;
                }
                break;
        }
    });
}

// Configurar interfaz según la configuración
function configurarInterfaz() {
    // Mostrar/ocultar stock
    if (!CONFIG.interfaz.mostrarStock) {
        const stockElements = document.querySelectorAll('.stock');
        stockElements.forEach(el => el.style.display = 'none');
    }
    
    // Mostrar/ocultar categorías
    if (!CONFIG.interfaz.mostrarCategorias) {
        const categoryElements = document.querySelectorAll('.categoria');
        categoryElements.forEach(el => el.style.display = 'none');
    }
    
    // Habilitar/deshabilitar búsqueda
    if (!CONFIG.interfaz.habilitarBusqueda) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.disabled = true;
            searchInput.placeholder = 'Búsqueda deshabilitada';
        }
    }
    
    // Habilitar/deshabilitar animaciones
    if (!CONFIG.interfaz.animaciones) {
        document.body.style.setProperty('--animation-duration', '0s');
    }
}

// Función para cambiar modo oscuro
function toggleModoOscuro() {
    CONFIG.interfaz.modoOscuro = !CONFIG.interfaz.modoOscuro;
    
    if (CONFIG.interfaz.modoOscuro) {
        document.body.classList.add('modo-oscuro');
    } else {
        document.body.classList.remove('modo-oscuro');
    }
}

// Función para actualizar configuración en tiempo real
function actualizarConfiguracion(nuevaConfig) {
    Object.assign(CONFIG, nuevaConfig);
    aplicarConfiguracion();
}

// Exportar configuración para uso global
window.CONFIG = CONFIG;
window.aplicarConfiguracion = aplicarConfiguracion;
window.toggleModoOscuro = toggleModoOscuro;
window.actualizarConfiguracion = actualizarConfiguracion;

// Aplicar configuración al cargar la página
document.addEventListener('DOMContentLoaded', aplicarConfiguracion); 