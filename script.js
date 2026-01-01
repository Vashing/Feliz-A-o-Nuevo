document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     🔽 SCROLL POR PANELES
     ========================= */
  const panels = document.querySelectorAll('.panel');
  let currentPanel = 0;
  let isScrolling = false;

  function scrollToPanel(index) {
    if (index < 0 || index >= panels.length) return;

    isScrolling = true;
    panels[index].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    currentPanel += e.deltaY > 0 ? 1 : -1;
    scrollToPanel(currentPanel);
  });

  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50 && !isScrolling) {
      currentPanel += diff > 0 ? 1 : -1;
      scrollToPanel(currentPanel);
    }
  });

  /* =========================
     🎞️ VIDEOS DECORATIVOS
     ========================= */
  document.querySelectorAll('.foto-decorativa').forEach(video => {
    video.addEventListener('loadeddata', () => {
      video.pause();
    });
  });

  /* =========================
     🖼️ COLLAGE INTERACTIVO
     ========================= */
  document.querySelectorAll('.collage img').forEach(img => {
    img.addEventListener('click', () => {
      document
        .querySelectorAll('.collage img')
        .forEach(i => i.classList.remove('activa'));

      img.classList.add('activa');
    });
  });

  /* =========================
     💖 BOTÓN SECRETO + MODAL
     ========================= */
  const nombre = document.getElementById('nombreSecreto');
  const btn = document.getElementById('btnSorpresa');
  const modal = document.getElementById('modalSorpresa');
  const video = document.getElementById('videoSorpresa');
  const cerrar = document.getElementById('cerrarModal');

  let botonRevelado = false;

  nombre.addEventListener('click', () => {
    if (botonRevelado) return;
    botonRevelado = true;

    btn.classList.remove('oculto');
    btn.style.display = 'block';

    btn.animate(
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 500, easing: 'ease-out' }
    );

    navigator.vibrate?.(30);
  });

  btn.addEventListener('click', () => {
    modal.classList.remove('oculto');
    video.currentTime = 0;

    musica.pause(); // ⛔ pausa música
    video.play();
  });

  cerrar.addEventListener('click', () => {
    modal.classList.add('oculto');
    video.pause();

    musica.play(); // 🎶 vuelve música
  });

  /* =========================
   🎶 MÚSICA + FECHA SECRETA
   ========================= */

const boton = document.getElementById("entrar");
const fechaInput = document.getElementById("fecha");
const login = document.getElementById("login");
const container = document.getElementById("container");
const musica = document.getElementById("musicaFondo");

const FECHA_CORRECTA = "2025-12-15"; // ❤️ TU FECHA REAL

boton.addEventListener("click", () => {
  const fechaIngresada = fechaInput.value;

  if (fechaIngresada === FECHA_CORRECTA) {

    // Oculta login
    login.style.display = "none";

    // Muestra contenido real
    container.classList.remove("hidden");

    // 🎶 Música (permitida porque viene de un click)
    musica.volume = 0.4;
    musica.currentTime = 0;

    musica.play().catch(err => {
      console.log("Audio bloqueado:", err);
    });

  } else {
    document.getElementById("error").textContent =
      "Esa no es nuestra fecha 💔 Inténtalo de nuevo";
  }
});


});
