import instance from "./config";

export default {
    getPersonal: () => instance.get('/personal'),
    getPersonalById: (id) => instance.get(`/personal/buscarId`, { params: { id } }),
    createPersonal: (personal) => {
        // 'nombre' => 'required|string|max:255',
        // 'apellido' => 'required|string|max:255',
        // 'rut' => 'nullable|string|max:255',
        // 'telefono' => 'nullable|string|max:255',
        // 'direccion' => 'nullable|string|max:255',
        // 'id_area' => 'required|integer|exists:areas,id',
        return instance.post('/personal', personal)
    },
    updatePersonal: (personal) => {
        // 'id' => 'required|integer|exists:personal,id',
        // 'nombre' => 'required|string|max:255',
        // 'apellido' => 'required|string|max:255',
        // 'rut' => 'nullable|string|max:255',
        // 'telefono' => 'nullable|string|max:255',
        // 'direccion' => 'nullable|string|max:255',
        // 'id_area' => 'required|integer|exists:areas,id',
        return instance.put('/personal', personal)
    },
    deletePersonal: (id) => instance.delete(`/personal/`, { data: { id } }),

    getAreas: () => instance.get('/personal/areas'),

    getPersonalEvento: (idEvento) => instance.get('/eventos/personal', { params: { id_evento: idEvento } }),
    getPersonalEventoById: (id) => instance.get(`/eventos/personal/buscarId`, { params: { id } }),
    createPersonalEvento: (personalEvento) => {
        // 'honorarios' => 'required|integer',
        // 'id_personal' => 'required|integer|exists:personal,id',
        // 'id_evento' => 'required|integer|exists:eventos,id'
        return instance.post('/eventos/personal', personalEvento)
    },

    updatePersonalEvento: (personalEvento) => {
        // 'id' => 'required|integer|exists:personal_eventos,id',
        // 'honorarios' => 'required|integer',
        return instance.put('/eventos/personal', personalEvento)
    },
    // "id_evento" => "required|integer|exists:eventos,id",
    // "id_personal" => "required|integer|exists:personal,id",
    deletePersonalEvento: (idEvento, idPersonal) => instance.delete(`/eventos/personal`, {
        data: {
            id_evento: idEvento,
            id_personal: idPersonal
        }
    }),


}