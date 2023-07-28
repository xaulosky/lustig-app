import instance from "./config";
export default {
  getEventos: () => {
    return instance.get("/eventos");
  },
  getEvento: (id) => {
    return instance.get(`/eventos/buscarId`, { params: { id: id } });
  },
  createEvento: (evento) => {
    return instance.post("/eventos", evento);
  },
  updateEvento: (evento) => {
    return instance.put("eventos", evento);
  },
  deleteEvento: (id) => {
    return instance.delete("eventos", { data: { id } });
  },
  cambiarEstado: (id, idEstado) => {
    return instance.put("eventos/estado", { id, id_estado_evento: idEstado });
  },

  getTiposEventos: () => {
    return instance.get("/tipoEventos")
  },
  // 'nombre' => 'required|string|max:255'
  createTipoEvento: (tipoEvento) => {
    return instance.post("/tipoEventos", tipoEvento)
  },
  deleteTipoEvento: (id) => {
    return instance.delete("/tipoEventos", { data: { id } })
  },
  getInvitados: (id) => {
    return instance.get("/eventos/invitados", { params: { id_evento: id } });
  },
  
}

