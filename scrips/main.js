import { obtenerSeries, buscarSeriesPorNombre } from "./Service.js";
import { obtenerEstado, establecerEstado } from "./State.js";
import { mostrarCarga, ocultarCarga, mostrarError, ocultarError, renderizarSeries, actualizarPaginacion, renderizarFiltrosDeGenero, marcarFiltroActivo, renderizarHistorialDeBusquedas, actualizarBotonFavorito,} from "./ui.js";
import {agregarFavorito, eliminarFavorito, esFavorito, agregarAlHistorial, obtenerHistorial, guardarElementosPorPagina, obtenerElementosPorPagina,} from "./Persistence.js";