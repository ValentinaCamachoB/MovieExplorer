import { obtenerSeries, buscarSeriesPorNombre } from "./Service.js";
import { obtenerEstado, establecerEstado } from "./State.js";
import { mostrarCarga, ocultarCarga, mostrarError, ocultarError, renderizarSeries, actualizarPaginacion, renderizarFiltrosDeGenero, marcarFiltroActivo, renderizarHistorialDeBusquedas, actualizarBotonFavorito,} from "./ui.js";
import {agregarFavorito, eliminarFavorito, esFavorito, agregarAlHistorial, obtenerHistorial, guardarElementosPorPagina, obtenerElementosPorPagina,} from "./Persistence.js";

async function cargarSeriesIniciales() {
    try {
        mostrarCarga();
        ocultarError();
 
        const seriesObtenidas = await obtenerSeries(0);
 
        establecerEstado("series", seriesObtenidas);
        establecerEstado("paginaActual", 1);
        establecerEstado("generoSeleccionado", "Todos");
 
        renderizarFiltrosDeGenero(seriesObtenidas);
        marcarFiltroActivo("Todos");
 
        ocultarCarga();
        mostrarPaginaActual();
 
    } catch (error) {
        ocultarCarga();
        mostrarError("No se pudieron cargar las series. Verifica tu conexión.");
        console.error("Error al cargar series:", error);
    }
}