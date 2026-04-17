document.getElementById("filtrosGenero").addEventListener("click", (evento) => {
    const boton = evento.target.closest(".boton-genero");
    if (!boton) return;

    const genero = boton.dataset.genero;

    establecerEstado("generoSeleccionado", genero);
    establecerEstado("paginaActual", 1);

    marcarFiltroActivo(genero);
    mostrarPaginaActual();
});

function mostrarPaginaActual() {
    const todasLasSeries = obtenerEstado("series");
    const numeroPagina   = obtenerEstado("paginaActual");
    const cantidadPorPag = obtenerEstado("elementosPorPagina");
    const generoActivo   = obtenerEstado("generoSeleccionado");

    let seriesFiltradas = todasLasSeries;

    if (generoActivo && generoActivo !== "Todos") {
        seriesFiltradas = todasLasSeries.filter(
            (serie) => serie.genres && serie.genres.includes(generoActivo)
        );
    }

    const totalDePaginas = Math.ceil(seriesFiltradas.length / cantidadPorPag) || 1;

    const inicio = (numeroPagina - 1) * cantidadPorPag;
    const fin    = inicio + cantidadPorPag;

    const seriesDeEstaPagina = seriesFiltradas.slice(inicio, fin);

    renderizarSeries(seriesDeEstaPagina);
    actualizarPaginacion(numeroPagina, totalDePaginas);
}