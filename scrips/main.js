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

function registrarEventos() {
 
    const botonBuscar = document.getElementById("botonBuscar");
    const campoBuscar = document.getElementById("campoBusqueda");
 
    // Clic en "Buscar"
    botonBuscar.addEventListener("click", () => {
        ejecutarBusqueda(campoBuscar.value);
    });
 
    // Presionar Enter en el buscador
    campoBuscar.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            ejecutarBusqueda(campoBuscar.value);
        }
    });
 
    // Clic en una búsqueda del historial
    document.getElementById("historialBusquedas").addEventListener("click", (evento) => {
        const item = evento.target.closest("li");
        if (!item) return;
        campoBuscar.value = item.dataset.termino;
        ejecutarBusqueda(item.dataset.termino);
    });
 
    // Cambiar cantidad por página
    document.getElementById("selectorCantidad").addEventListener("change", (evento) => {
        const cantidad = Number(evento.target.value);
        establecerEstado("elementosPorPagina", cantidad);
        establecerEstado("paginaActual", 1);
        guardarElementosPorPagina(cantidad);
        mostrarPaginaActual();
    });
 
    // Botón ← Anterior
    document.getElementById("botonAnterior").addEventListener("click", () => {
        const pagina = obtenerEstado("paginaActual");
        if (pagina > 1) {
            establecerEstado("paginaActual", pagina - 1);
            mostrarPaginaActual();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
 
    // Botón Siguiente →
    document.getElementById("botonSiguiente").addEventListener("click", () => {
        const pagina         = obtenerEstado("paginaActual");
        const cantidad       = obtenerEstado("elementosPorPagina");
        const genero         = obtenerEstado("generoSeleccionado");
        let   series         = obtenerEstado("series");
 
        if (genero && genero !== "Todos") {
            series = series.filter((s) => s.genres && s.genres.includes(genero));
        }
 
        const total = Math.ceil(series.length / cantidad) || 1;
        if (pagina < total) {
            establecerEstado("paginaActual", pagina + 1);
            mostrarPaginaActual();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
 
    // Filtros de género (delegación de eventos)
    document.getElementById("filtrosGenero").addEventListener("click", (evento) => {
        const boton = evento.target.closest(".boton-genero");
        if (!boton) return;
        const genero = boton.dataset.genero;
        establecerEstado("generoSeleccionado", genero);
        establecerEstado("paginaActual", 1);
        marcarFiltroActivo(genero);
        mostrarPaginaActual();
    });
 
    // Botones favorito en las tarjetas (delegación de eventos)
    document.getElementById("contenedorSeries").addEventListener("click", (evento) => {
        const boton = evento.target.closest(".boton-favorito");
        if (!boton) return;
 
        const idSerie = Number(boton.dataset.id);
 
        if (esFavorito(idSerie)) {
            eliminarFavorito(idSerie);
            actualizarBotonFavorito(idSerie, false);
        } else {
            const serie = obtenerEstado("series").find((s) => s.id === idSerie);
            if (serie) {
                agregarFavorito(serie);
                actualizarBotonFavorito(idSerie, true);
            }
        }
    });
}

async function iniciarAplicacion() {
    // Recuperar configuración guardada
    const cantidad = obtenerElementosPorPagina();
    establecerEstado("elementosPorPagina", cantidad);
    document.getElementById("selectorCantidad").value = cantidad;
 
    // Mostrar historial guardado
    renderizarHistorialDeBusquedas(obtenerHistorial());
 
    // Registrar eventos
    registrarEventos();
 

    await cargarSeriesIniciales();
}
 
iniciarAplicacion();