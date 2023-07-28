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

}