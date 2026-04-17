export function renderizarFiltrosDeGenero(listaDeSeries) {
    const contenedorFiltros = document.getElementById("filtrosGenero");
    if (!contenedorFiltros) return;

    const generosUnicos = new Set();

    listaDeSeries.forEach((serie) => {
        if (serie.genres) {
            serie.genres.forEach((genero) => generosUnicos.add(genero));
        }
    });

    contenedorFiltros.innerHTML = `
        <button class="boton-genero activo" data-genero="Todos">Todos</button>
    `;

    generosUnicos.forEach((genero) => {
        const boton = document.createElement("button");
        boton.className = "boton-genero";
        boton.dataset.genero = genero;
        boton.textContent = genero;
        contenedorFiltros.appendChild(boton);
    });
}

export function marcarFiltroActivo(generoActivo) {
    document.querySelectorAll(".boton-genero").forEach((boton) => {
        if (boton.dataset.genero === generoActivo) {
            boton.classList.add("activo");
        } else {
            boton.classList.remove("activo");
        }
    });
}