const DIRECCION_BASE_API = "https://api.tvmaze.com";
 
export async function obtenerSeries(numeroPagina = 0) {
    const respuesta = await fetch(
        `${DIRECCION_BASE_API}/shows?page=${numeroPagina}`
    );
 
    if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las series.");
    }
 
    const listaDeSeries = await respuesta.json();
    return listaDeSeries;
}