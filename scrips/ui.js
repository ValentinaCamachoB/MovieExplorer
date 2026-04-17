export function actualizarPaginacion(numeroPaginaActual, totalDePaginas) {
    const paginacion = document.getElementById("paginacion");
    if (!paginacion) return;
 
    paginacion.classList.remove("oculto");
 
    document.getElementById("indicadorPagina").textContent =
        `Página ${numeroPaginaActual} de ${totalDePaginas}`;
 
    document.getElementById("botonAnterior").disabled = numeroPaginaActual === 1;
    document.getElementById("botonSiguiente").disabled = numeroPaginaActual === totalDePaginas;
}