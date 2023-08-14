import instance from "./config";

export default {

    getInvitados: (idEvento) => {
        return instance.get('/eventos/invitados', {
            params: {
                id_evento: idEvento
            }
        })
    },
    getInvitado: (id) => {
        return instance.get(`/eventos/invitados/id`, {
            params: {
                id: id
            }
        })
    },
    createInvitado: (invitado) => {
        // 'nombre' => 'required|string|max:255',
        // 'detalles' => 'nullable|string|max:255',
        // 'id_mesa_evento' => 'required|integer|exists:mesas_eventos,id'
        return instance.post('/eventos/invitados', invitado)
    },
    updateInvitado: (invitado) => {
        // 'id' => 'required|integer|exists:mesas_eventos,id',
        // 'nombre' => 'required|string|max:255',
        // 'cantidad_personas' => 'required|integer',
        return instance.put('/eventos/invitados', invitado)
    },

    deleteInvitado: (id) => {
        return instance.delete(`/eventos/invitados`, {
            data: {
                id
            }
        })
    }
}