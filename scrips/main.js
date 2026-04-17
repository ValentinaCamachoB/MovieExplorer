document.getElementById("filtrosGenero").addEventListener("click", (evento) => {
    const boton = evento.target.closest(".boton-genero");
    if (!boton) return;

    const genero = boton.dataset.genero;

    establecerEstado("generoSeleccionado", genero);
    establecerEstado("paginaActual", 1);

    marcarFiltroActivo(genero);
    mostrarPaginaActual();
});