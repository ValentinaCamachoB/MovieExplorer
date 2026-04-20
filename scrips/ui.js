
import { esFavorito } from "./Persistence.js";


export function mostrarCarga() {
    document.getElementById("spinner").classList.remove("oculto");
    document.getElementById("contenedorSeries").classList.add("oculto");

    const paginacion = document.getElementById("paginacion");
    if (paginacion) paginacion.classList.add("oculto");
}

export function ocultarCarga() {
    document.getElementById("spinner").classList.add("oculto");
    document.getElementById("contenedorSeries").classList.remove("oculto");
}


export function mostrarError(mensaje) {
    const elementoError = document.getElementById("mensajeError");
    elementoError.textContent = mensaje;
    elementoError.classList.remove("oculto");
}

export function ocultarError() {
    document.getElementById("mensajeError").classList.add("oculto");
}



function crearTarjetaDeSerie(serie) {
    const yaEsFavorita = esFavorito(serie.id);

    const htmlImagen = serie.image && serie.image.medium
        ? `<img src="${serie.image.medium}" alt="Imagen de ${serie.name}" loading="lazy" />`
        : `<div class="imagen-placeholder">🎬</div>`;

    const textoGeneros = serie.genres && serie.genres.length > 0
        ? serie.genres.join(", ")
        : "Sin género";

    const textoRating = serie.rating && serie.rating.average
        ? `★ ${serie.rating.average}`
        : "Sin calificación";

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-serie";
    tarjeta.dataset.id = serie.id;

    tarjeta.innerHTML = `
        ${htmlImagen}
        <div class="cuerpo-tarjeta">
            <h3 class="titulo-tarjeta">${serie.name}</h3>
            <p class="generos-tarjeta">${textoGeneros}</p>
            <p class="rating-tarjeta">${textoRating}</p>
            <div class="acciones-tarjeta">
                <a href="Show.html?id=${serie.id}" class="boton-detalle">
                    Ver detalles
                </a>
                <button
                    class="boton-favorito ${yaEsFavorita ? "es-favorito" : ""}"
                    data-id="${serie.id}"
                >
                    ${yaEsFavorita ? "❤ En favoritos" : "♡ Agregar"}
                </button>
            </div>
        </div>
    `;

    return tarjeta;
}



export function renderizarSeries(listaDeSeries) {
    const contenedor = document.getElementById("contenedorSeries");
    contenedor.innerHTML = "";

    if (!listaDeSeries || listaDeSeries.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-sin-resultados">No se encontraron series.</p>`;
        return;
    }

    listaDeSeries.forEach((serie) => {
        const tarjeta = crearTarjetaDeSerie(serie);
        contenedor.appendChild(tarjeta);
    });
}



export function renderizarHistorialDeBusquedas(listaHistorial) {
    const contenedor = document.getElementById("historialBusquedas");
    if (!contenedor) return;

    if (!listaHistorial || listaHistorial.length === 0) {
        contenedor.classList.add("oculto");
        return;
    }

    contenedor.classList.remove("oculto");
    contenedor.innerHTML = `
        <h4>Búsquedas recientes</h4>
        <ul>
            ${listaHistorial
                .map((t) => `<li data-termino="${t}">${t}</li>`)
                .join("")}
        </ul>
    `;
}



export function actualizarBotonFavorito(idSerie, estaEnFavoritos) {
    const boton = document.querySelector(`.boton-favorito[data-id="${idSerie}"]`);
    if (!boton) return;

    if (estaEnFavoritos) {
        boton.classList.add("es-favorito");
        boton.textContent = "❤ En favoritos";
    } else {
        boton.classList.remove("es-favorito");
        boton.textContent = "♡ Agregar";
    }
}
 

