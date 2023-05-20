let boton = document.querySelector (".reproductor")
let audioEtiqueta = document.querySelector ("audio")

boton.addEventListener ("click", () => {
  // Si el audio no tiene fuente, se le asigna una
  if (!audioEtiqueta.src) {
    audioEtiqueta.setAttribute ("src", "ruta_a_tu_archivo")
  }
  // Si el audio está en pausa, se reproduce y se cambia el texto del botón
  if (audioEtiqueta.paused) {
    audioEtiqueta.play ()
    boton.textContent = "⏸"
  } else {
    // Si el audio está reproduciéndose, se pausa y se cambia el texto del botón
    audioEtiqueta.pause ()
    boton.textContent = "🎵"
  }
})

  // Obtener el elemento button por su id
  let refresh = document.getElementById("refresh");
  // Añadir un evento de click al botón
  refresh.addEventListener("click", function() {
    // Volver a cargar la página actual
    location.reload();
  });