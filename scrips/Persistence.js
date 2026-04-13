import { guardarEnStorage, leerDeStorage } from "./Storage.js";

const CLAVE_FAVORITOS     = "explorador_favoritos";
const CLAVE_HISTORIAL     = "explorador_historial";
const CLAVE_ITEMS_POR_PAG = "explorador_items_pagina";

export function obtenerFavoritos() {
    return leerDeStorage(CLAVE_FAVORITOS) || [];
}

export function agregarFavorito(serie) {
    const listaFavoritos = obtenerFavoritos();
    const yaEstaGuardada = listaFavoritos.some(f => f.id === serie.id);
    if (yaEstaGuardada) return;
    listaFavoritos.push(serie);
    guardarEnStorage(CLAVE_FAVORITOS, listaFavoritos);
}

export function eliminarFavorito(idSerie) {
    const listaFavoritos = obtenerFavoritos();
    const actualizada = listaFavoritos.filter(f => f.id !== idSerie);
    guardarEnStorage(CLAVE_FAVORITOS, actualizada);
}

export function esFavorito(idSerie) {
    const listaFavoritos = obtenerFavoritos();
    return listaFavoritos.some(f => f.id === idSerie);
}

export function obtenerHistorial() {
    return leerDeStorage(CLAVE_HISTORIAL) || [];
}

export function agregarAlHistorial(terminoBuscado) {
    if (!terminoBuscado || terminoBuscado.trim() === "") return;
    let lista = obtenerHistorial();
    lista = lista.filter(b => b.toLowerCase() !== terminoBuscado.toLowerCase());
    lista.unshift(terminoBuscado.trim());
    if (lista.length > 10) lista = lista.slice(0, 10);
    guardarEnStorage(CLAVE_HISTORIAL, lista);
}