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
}