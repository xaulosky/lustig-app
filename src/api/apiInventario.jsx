import instance from './config'
export default {
    getInventario: () => {
        return instance.get('/inventario')
    },
    getObjetoInventario: (id) => {
        return instance.get(`/inventario/buscarId/`, { params: { id: id } })
    },
    createObjetoInventario: (objeto) => {
        // 'nombre' => 'required|string|max:255',
        // 'cantidad' => 'nullable|numeric',
        // 'unidad_medida' => 'nullable|string|max:255',
        return instance.post('/inventario', objeto)
    },
    updateObjetoInventario: (objeto) => {
        // 'id' => 'required|integer|exists:inventario,id',
        // 'nombre' => 'required|string|max:255',
        // 'cantidad' => 'nullable|numeric',
        // 'unidad_medida' => 'nullable|string|max:255',
        return instance.put('/inventario', objeto)
    },
    deleteObjetoInventario: (id) => {
        return instance.delete(`/inventario`, { data: { id } })
    },

    // INSUMOS DE EVENTOS

    getInsumosEvento: (idEvento) => {
        return instance.get(`/eventos/insumos`, { params: { id_evento: idEvento } })
    },
    createInsumoEvento: (insumo) => {
        // 'cantidad_a_usar' => 'nullable|numeric',
        // 'cantidad_devuelta' => 'nullable|numeric',
        // 'id_inventario' => 'required|integer|exists:inventario,id',
        // 'id_evento' => 'required|integer|exists:eventos,id'
        return instance.post('/eventos/insumos', insumo)
    },
    updateInsumoEvento: (insumo) => {
        // 'id' => 'required|integer|exists:insumos_eventos,id',
        // 'cantidad_a_usar' => 'nullable|numeric',
        // 'cantidad_devuelta' => 'nullable|numeric',
        return instance.put('/eventos/insumos', insumo)
    },
    deleteInsumoEvento: (id) => {
        return instance.delete(`/eventos/insumos`, { data: { id } })
    },

    // CONSUMIBLES DE EVENTOS

    getConsumiblesEvento: (idEvento) => {
        return instance.get(`/eventos/consumibles`, { params: { id_evento: idEvento } })
    },
    createConsumibleEvento: (consumible) => {
        // 'nombre' => 'required|string|max:255',
        // 'cantidad' => 'required|numeric',
        // 'unidad_medida' => 'nullable|string|max:255',
        // 'id_evento' => 'required|integer|exists:eventos,id'
        return instance.post('/eventos/consumibles', consumible)
    },
    updateConsumibleEvento: (consumible) => {
        // 'id' => 'required|integer|exists:consumibles_eventos,id',
        // 'nombre' => 'required|string|max:255',
        // 'cantidad' => 'required|numeric',
        // 'unidad_medida' => 'nullable|string|max:255',
        return instance.put('/eventos/consumibles', consumible)
    },
    deleteConsumibleEvento: (id) => {
        return instance.delete(`/eventos/consumibles`, { data: { id } })
    }
}