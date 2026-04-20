
export function guardarEnStorage(clave, valor) {
    
    localStorage.setItem(clave, JSON.stringify(valor));
}
 

export function leerDeStorage(clave) {
    const datoComoTexto = localStorage.getItem(clave);
    if (datoComoTexto === null) return null;
    
    return JSON.parse(datoComoTexto);
}
 

export function borrarDeStorage(clave) {
    localStorage.removeItem(clave);
}
 

export function limpiarTodoElStorage() {
    localStorage.clear();
}