import instance from "./config";

export default {

    // Estados de mesas: [
    //     { id: 1, nombre: "Vacía" },
    //     { id: 2, nombre: "Montada" },
    //     { id: 3, nombre: "Plato de Entrada" },
    //     { id: 4, nombre: "Plato Principal" },
    //     { id: 5, nombre: "Postre" },
    //     { id: 6, nombre: "Lista" },
    // ]

    // MESAS
    getMesas: (idEvento) => {
        return instance.get('/eventos/mesas', {
            params: {
                id_evento: idEvento
            }
        })
    },
    getMesa: (id) => {
        return instance.get(`/eventos/mesas/buscarId`, {
            params: {
                id: id
            }
        })
    },
    createMesa: (mesa) => {
        // 'nombre' => 'required|string|max:255',
        // 'cantidad_personas' => 'required|integer',
        // 'id_evento' => 'required|integer|exists:eventos,id',
        // 'id_estado_mesa_evento' => 'nullable|integer|exists:estados_mesas_eventos,id'
        return instance.post('/eventos/mesas', mesa)
    },
    updateMesa: (mesa) => {
        // 'id' => 'required|integer|exists:mesas_eventos,id',
        // 'nombre' => 'required|string|max:255',
        // 'cantidad_personas' => 'required|integer',
        return instance.put('/eventos/mesas', mesa)
    },
    updateEstadoMesa: (idMesa, idEstado) => {
        return instance.put('/eventos/mesas/estado', {
            id: idMesa,
            id_estado_mesa_evento: idEstado
        })
    },

    deleteMesa: (id) => {
        return instance.delete(`/eventos/mesas`, {
            data: {
                id
            }
        })
    }
}