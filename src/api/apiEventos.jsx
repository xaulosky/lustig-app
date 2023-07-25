import instance from './config'
export default {
    getEventos: () => {
        return instance.get('/eventos')
    },
    getEvento: (id) => {
        return instance.get(`/eventos/buscarId/`, { params: { id: id } })
    },
    createEvento: (evento) => {
        return instance.post('/eventos', evento)
    }
}