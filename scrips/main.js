function mostrarPaginaActual() {
    const todasLasSeries = obtenerEstado("series");
    const numeroPagina   = obtenerEstado("paginaActual");
    const cantidadPorPag = obtenerEstado("elementosPorPagina");

    const totalDePaginas = Math.ceil(todasLasSeries.length / cantidadPorPag) || 1;

    const inicio = (numeroPagina - 1) * cantidadPorPag;
    const fin    = inicio + cantidadPorPag;

    const seriesDeEstaPagina = todasLasSeries.slice(inicio, fin);

    renderizarSeries(seriesDeEstaPagina);
    actualizarPaginacion(numeroPagina, totalDePaginas);
}

// Botón ← Anterior
document.getElementById("botonAnterior").addEventListener("click", () => {
    const pagina = obtenerEstado("paginaActual");

    if (pagina > 1) {
        establecerEstado("paginaActual", pagina - 1);
        mostrarPaginaActual();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});


document.getElementById("botonSiguiente").addEventListener("click", () => {
    const pagina   = obtenerEstado("paginaActual");
    const cantidad = obtenerEstado("elementosPorPagina");
    const series   = obtenerEstado("series");

    const total = Math.ceil(series.length / cantidad) || 1;

    if (pagina < total) {
        establecerEstado("paginaActual", pagina + 1);
        mostrarPaginaActual();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});