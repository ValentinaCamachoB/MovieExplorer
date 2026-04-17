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