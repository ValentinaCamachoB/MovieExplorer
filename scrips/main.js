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

async function ejecutarBusqueda(textoBuscado) {
    if (!textoBuscado || textoBuscado.trim() === "") return;
 
    try {
        mostrarCarga();
        ocultarError();
 
        agregarAlHistorial(textoBuscado);
        renderizarHistorialDeBusquedas(obtenerHistorial());
 
        const resultados = await buscarSeriesPorNombre(textoBuscado);
 
        establecerEstado("series", resultados);
        establecerEstado("paginaActual", 1);
        establecerEstado("terminoDeBusqueda", textoBuscado);
        establecerEstado("generoSeleccionado", "Todos");
 
        renderizarFiltrosDeGenero(resultados);
        marcarFiltroActivo("Todos");
 
        ocultarCarga();
        mostrarPaginaActual();
 
        // Mostrar botón para volver a ver todas las series
        mostrarBotonVolver();
 
    } catch (error) {
        ocultarCarga();
        mostrarError("Hubo un error al buscar. Intenta de nuevo.");
        console.error("Error al buscar:", error);
    }
}

function mostrarBotonVolver() {
    if (document.getElementById("botonVolverInicio")) return;
 
    const boton = document.createElement("button");
    boton.id = "botonVolverInicio";
    boton.textContent = "VER TODO";
    boton.className = "boton-volver-inicio";
 
    boton.addEventListener("click", () => {
        document.getElementById("campoBusqueda").value = "";
        boton.remove();
        cargarSeriesIniciales();
    });
 
    document.querySelector(".hero").appendChild(boton);
}