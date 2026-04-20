const estado = {
    series: [],
    paginaActual: 1,
    elementosPorPagina: 20,
    generoSeleccionado: "Todos",
    terminoDeBusqueda: "",
};

export function obtenerEstado() {
    return estado;
}

export function establecerEstado(nuevoEstado) {
    Object.assign(estado, nuevoEstado);
}