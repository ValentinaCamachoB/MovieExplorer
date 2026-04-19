import { obtenerFavoritos, eliminarFavorito } from "./Persistence.js";

function mostrarFavoritos() {
    const listaFavoritos   = obtenerFavoritos();
    const contenedor       = document.getElementById("contenedorFavoritos");
    const mensajeVacio     = document.getElementById("mensajeListaVacia");

    mensajeVacio.classList.add("oculto");
    contenedor.innerHTML = "";

    listaFavoritos.forEach((serie) => {
        const htmlImagen = serie.image && serie.image.medium
            ? `<img src="${serie.image.medium}" alt="Imagen de ${serie.name}" loading="lazy" />`
            : `<div class="imagen-placeholder">🎬</div>`;

        const textoGeneros = serie.genres && serie.genres.length > 0
            ? serie.genres.join(", ")
            : "Sin género";

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-serie";
        tarjeta.dataset.id = serie.id;

        tarjeta.innerHTML = `
            ${htmlImagen}
            <div class="cuerpo-tarjeta">
                <h3 class="titulo-tarjeta">${serie.name}</h3>
                <p class="generos-tarjeta">${textoGeneros}</p>
                <div class="acciones-tarjeta">
                    <a href="Show.html?id=${serie.id}" class="boton-detalle">
                        Ver detalles
                    </a>
                    <button class="boton-eliminar-favorito" data-id="${serie.id}">
                        ❤ Quitar favorito
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}