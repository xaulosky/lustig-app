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

  getCronograma: (id) => {
    return instance.get("/eventos/cronograma", { params: { id: id } });
  },
  editarCronograma: (id, cronograma) => {
    return instance.put("/eventos/cronograma", { id, cronograma });
  },

  getGastos: (evento) => {
    return instance.get("/eventos/gastos", { params: { id_evento: evento } });
  },
  getGastosTotales: (id) => {
    return instance.get("/eventos/gastos/total", { params: { id_evento: id } });
  },
  createGasto: (gasto) => {
    // 'nombre' => 'required|string|max:255',
    // 'monto' => 'required|integer',
    // 'descripcion' => 'nullable|string|max:255',
    // 'fecha' => 'required|date',
    // 'id_evento' => 'required|integer|exists:eventos,id'
    return instance.post("/eventos/gastos", gasto);
  },
  updateGasto: (gasto) => {
    // 'id' => 'required|integer|exists:gastos,id',
    // 'nombre' => 'required|string|max:255',
    // 'monto' => 'required|integer',
    // 'descripcion' => 'nullable|string|max:255',
    // 'fecha' => 'required|date',
    return instance.put("/eventos/gastos", gasto);
  },
  deleteGasto: (id) => {
    return instance.delete("/eventos/gastos", { data: { id: id } });
  }

}

