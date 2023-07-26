import instance from "./config";
export default {
  getClientes: () => {
    return instance.get("clientes");
  },
  getCliente: (id) => {
    return instance.get("clientes/buscarId", { params: { id } });
  },
  createCliente: (cliente) => {
    return instance.post("clientes", cliente);
  },
  updateCliente: (cliente) => {
    return instance.put("clientes", cliente);
  },
  deleteCliente: (id) => {
    return instance.delete("clientes", { data: { id } });
  },
};
