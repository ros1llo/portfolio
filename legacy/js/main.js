// ============================================================
// MAIN.JS — Álvaro Rosillo Portfolio
// ============================================================
// Este archivo tiene 4 funcionalidades:
//   1. Cursor personalizado
//   2. Animaciones al hacer scroll (Intersection Observer)
//   3. Efecto de tipeo en el hero
//   4. Navbar que cambia al hacer scroll
// ============================================================


// ============================================================
// 1. CURSOR PERSONALIZADO
//
// Buscamos el div #cursor en el HTML y lo movemos con JS
// cada vez que el raton se mueve por la pantalla.
//
// addEventListener('mousemove', callback) -> escucha el evento
// e.clientX / e.clientY -> coordenadas actuales del raton
// style.left / style.top -> posicionamos el div ahi
// ============================================================
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Cuando el raton entra en un enlace o boton, el cursor crece.
// querySelectorAll devuelve TODOS los elementos que coincidan.
// forEach itera sobre cada uno y anade los eventos.
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '40px';
    cursor.style.height = '40px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
  });
});


// ============================================================
// 2. ANIMACIONES AL HACER SCROLL — Intersection Observer
//
// IntersectionObserver es una API del navegador que vigila
// si un elemento esta visible en pantalla o no.
//
// Cuando el elemento entra en la pantalla -> le anadimos la
// clase CSS "visible", que activa la animacion de fadeUp.
//
// threshold: 0.15 -> se activa cuando el 15% del elemento
//                    es visible en pantalla
// ============================================================

// Anadimos la clase "reveal" a los elementos que queremos animar
const elementosAnimados = document.querySelectorAll('.reveal');

elementosAnimados.forEach(el => {
  el.classList.add('reveal');
});

// Creamos el observer. La funcion callback se ejecuta
// cada vez que un elemento observado entra o sale de pantalla.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // El elemento es visible -> activamos la animacion
        entry.target.classList.add('visible');
        // Dejamos de observarlo para no repetir la animacion
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

// Le decimos al observer que elementos tiene que vigilar
elementosAnimados.forEach(el => observer.observe(el));


// ============================================================
// 3. EFECTO DE TIPEO EN EL HERO
//
// Hace que el texto se escriba y borre solo, rotando
// entre diferentes descripciones.
//
// La logica:
//   - Si escribiendo -> anadimos un caracter cada X ms
//   - Si terminamos de escribir -> esperamos y borramos
//   - Si terminamos de borrar -> pasamos al siguiente texto
//
// setTimeout(funcion, ms) -> ejecuta la funcion despues de X ms
// substring(0, n) -> devuelve los primeros N caracteres
// ============================================================
const textos = [
  'Desarrollador Fullstack.',
  'Especialista en backend y frontend.',
  'IA aplicada al desarrollo web.',
];

const heroDesc = document.querySelector('#hero p:nth-child(3)');
const textoBase = 'Diseno y desarrollo paginas web para negocios y empresas. ';

let textoIndex = 0;   // que texto del array estamos mostrando
let charIndex   = 0;  // en que caracter vamos
let escribiendo = true; // escribiendo o borrando?

function animarTexto() {
  const textoActual = textos[textoIndex];

  if (escribiendo) {
    if (charIndex < textoActual.length) {
      heroDesc.textContent = textoBase + textoActual.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(animarTexto, 80); // 80ms por caracter al escribir
    } else {
      escribiendo = false;
      setTimeout(animarTexto, 2000); // pausa de 2s antes de borrar
    }
  } else {
    if (charIndex > 0) {
      heroDesc.textContent = textoBase + textoActual.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(animarTexto, 40); // 40ms por caracter al borrar (mas rapido)
    } else {
      escribiendo = true;
      // El operador % hace que cuando lleguemos al ultimo texto
      // volvamos al primero automaticamente
      textoIndex = (textoIndex + 1) % textos.length;
      setTimeout(animarTexto, 500);
    }
  }
}

// Iniciamos la animacion despues de 1.5s para que
// el hero ya sea visible cuando empiece
setTimeout(animarTexto, 1500);


// ============================================================
// 4. NAVBAR — cambio de estilo al hacer scroll
//
// window.scrollY -> cuantos pixeles ha bajado el usuario.
// Si ha bajado mas de 50px -> nav se vuelve mas opaca.
// ============================================================
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10,10,10,0.95)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.7)';
  }
});