export function mostrarSpinner() {
    console.log("Mostrando spinner...");
}

export function ocultarSpinner() {
    console.log("Ocultando spinner...");
}

export function mostrarError(mensaje) {
    console.error(mensaje);
}

export function ocultarError() {
    console.log("Ocultando error");
}

export function crearTarjetaDeSerie(serie) {
    return `<div>${serie.nombre}</div>`;
}