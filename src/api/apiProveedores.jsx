import instance from "./config";
export default {
  getProveedores: () => {
    return instance.get("proveedores");
  },
  getProveedor: (id) => {
    return instance.get("proveedores/buscarId", { params: { id } });
  },
  createProveedores: (proveedor) => {
    return instance.post("proveedores", proveedor);
  },
  updateProveedores: (proveedor) => {
    return instance.put("proveedores", proveedor);
  },
  deleteProveedores: (id) => {
    return instance.delete("proveedores", { data: { id } });
  },

  getProveedoresDeEvento: (idEvento) => {
    return instance.get("eventos/proveedores", {
      params: { id_evento: idEvento },
    });
  },
  agregarProveedorAEvento: (idProveedor, idEvento, descripcion) => {
    return instance.post("eventos/proveedores", {
      id_proveedor: idProveedor,
      id_evento: idEvento,
      descripcion,
    });
  },
  editarProveedorEnEvento: (idProveedor, idEvento, descripcion) => {
    return instance.put("eventos/proveedores", {
      id_proveedor: idProveedor,
      id_evento: idEvento,
      descripcion,
    });
  },
  eliminarProveedorEnEvento: (idProveedor, idEvento) => {
    return instance.delete("eventos/proveedores", {
      data: {
        id_evento: idEvento,
        id_proveedor: idProveedor,
      },
    });
  },
};
