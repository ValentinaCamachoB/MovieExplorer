 Movie Explorer
Aplicación web para explorar series usando la API de TVMaze.
 
 Integrantes
- Nombre VALENTINA — Estructura, API y búsqueda
- Nombre YANDER — Estado, UI, paginación y filtros
- Nombre JEAN — Favoritos y detalle de serie
 
 Funcionalidades
- Listado de series desde TVMaze con paginación
- Búsqueda por nombre de serie
- Historial de las últimas 10 búsquedas
- Filtro por género con botones dinámicos
- Selector de cantidad de series por página
- Página de detalle con información completa
- Sistema de favoritos guardado en localStorage
- Página dedicada de favoritos
- Diseño responsive para móvil y escritorio
 
 Cómo ejecutar
1. git clone https://github.com/usuario/movie-explorer.git
2. Abrir index.html con Live Server en VS Code


 Estructura del proyecto
MovieExplorer/
├── index.html          → Página principal
├── Show.html           → Detalle de serie
├── Favorites.html      → Página de favoritos
├── style.css           → Estilos
└── scripts/
    ├── main.js         → Lógica principal
    ├── Service.js      → Llamadas a la API
    ├── State.js        → Estado en memoria
    ├── Storage.js      → localStorage
    ├── Persistence.js  → Favoritos e historial
    ├── ui.js           → Funciones del DOM
    ├── Show.js         → Lógica del detalle
    └── Favorites.js    → Lógica de favoritos

 API utilizada
TVMaze — https://www.tvmaze.com/api
