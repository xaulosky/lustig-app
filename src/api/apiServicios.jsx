import instance from "./config";

export default {
    // SERVICIOS
    getServicios: () => {
        return instance.get('/servicios')
    },
    getServicio: (id) => {
        return instance.get(`/servicio/buscarId/`, {
            params: {
                id: id
            }
        })
    },
    deleteServicio: (id) => {
        return instance.delete(`/servicios`, { data: { id: id } })
    },

    createServicio: (servicio) => {
        // 'nombre' => 'required|string|max:255',
        return instance.post('/servicios', servicio)
    },
    updateServicio: (servicio) => {
        // 'id' => 'required|integer|exists:mesas_eventos,id',
        // 'nombre' => 'required|string|max:255',
        return instance.put('/servicios', servicio)
    },

    getServiciosEvento: (evento) => {
        return instance.get('/eventos/servicios', {
            params: {
                id_evento: evento
            }
        })
    },
    createServicioEvento: (servicio) => {
        // id_evento: 'required|integer|exists:eventos,id',
        // id_servicio: 'required|integer|exists:servicios,id',
        return instance.post('/eventos/servicios', servicio)
    },
    deleteServicioEvento: (servicio) => {
        // id_evento: 'required|integer|exists:eventos,id',
        // id_servicio: 'required|integer|exists:servicios,id',
        return instance.delete('/eventos/servicios', { data: servicio })
    }

}