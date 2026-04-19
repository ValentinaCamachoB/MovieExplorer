import { obtenerDetalleSerie } from "./Service.js";
import { agregarFavorito, eliminarFavorito, esFavorito } from "./Persistence.js";

function mostrarDetalleSerie(serie) {
    const contenedor = document.getElementById("detalleSerie");

    const htmlImagen = serie.image && serie.image.original
        ? `<img src="${serie.image.original}" alt="Póster de ${serie.name}" />`
        : `<div class="imagen-placeholder-grande">🎬</div>`;

    const textoGeneros = serie.genres && serie.genres.length > 0
        ? serie.genres.join(", ")
        : "Sin géneros";

    const textoRating = serie.rating && serie.rating.average
        ? `★ ${serie.rating.average}/10`
        : "Sin calificación";

    const resumen = serie.summary || "<p>Sin descripción disponible.</p>";

    const yaEsFavorita = esFavorito(serie.id);

    contenedor.innerHTML = `
        ${htmlImagen}
        <div class="informacion-detalle">
            <h1 class="titulo-detalle">${serie.name}</h1>
            <div class="seccion-info">
                <h3>Información Detallada:</h3>
                <div class="etiquetas-detalle">
                    <span class="etiqueta"> <strong>Géneros:</strong> ${textoGeneros}</span>
                    <span class="etiqueta"> <strong>Rating:</strong> ${textoRating}</span>
                    <span class="etiqueta"> <strong>Estado:</strong> ${serie.status || "Desconocido"}</span>
                    <span class="etiqueta"> <strong>Idioma:</strong> ${serie.language || "N/A"}</span>
                    <span class="etiqueta"> <strong>Estreno:</strong> ${serie.premiered || "N/A"}</span>
                    <span class="etiqueta"> <strong>Duracion:</strong> ${serie.runtime || "N/A"} min</span>
                    <span class="etiqueta"> <strong>Red:</strong> ${serie.network?.name || "N/A"}</span>
                </div>
            </div>
            <div class="seccion-resumen">
                <h3> Resumen:</h3>
                <div class="resumen-detalle">${resumen}</div>
            </div>
            <button id="botonFavoritoDetalle" class="boton-primario ${yaEsFavorita ? "es-favorito" : ""}">
                ${yaEsFavorita ? "❤ Quitar de favoritos" : "♡ Agregar a favoritos"}
            </button>
        </div>
    `;

    document.getElementById("botonFavoritoDetalle").addEventListener("click", () => {
        const boton = document.getElementById("botonFavoritoDetalle");
        if (esFavorito(serie.id)) {
            eliminarFavorito(serie.id);
            boton.innerHTML = "♡ Agregar a favoritos";
            boton.classList.remove("es-favorito");
        } else {
            agregarFavorito(serie);
            boton.innerHTML = " ❤ Quitar de favoritos";
            boton.classList.add("es-favorito");
        }
    });
}

async function iniciarPaginaDetalle() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idDeLaSerie   = parametrosURL.get("id");

    if (!idDeLaSerie) {
        const error = document.getElementById("mensajeError");
        error.textContent = "No se especificó ninguna serie en la URL.";
        error.classList.remove("oculto");
        return;
    }

    try {
        document.getElementById("spinner").classList.remove("oculto");
        const datosDelaSerie = await obtenerDetalleSerie(idDeLaSerie);
        document.getElementById("spinner").classList.add("oculto");
        mostrarDetalleSerie(datosDelaSerie);
        document.title = `${datosDelaSerie.name} — Movie Explorer`;

    } catch (error) {
        document.getElementById("spinner").classList.add("oculto");
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = "No se pudo cargar la serie. Intenta de nuevo.";
        mensajeError.classList.remove("oculto");
        console.error("Error al cargar detalle:", error);
    }
}

iniciarPaginaDetalle();