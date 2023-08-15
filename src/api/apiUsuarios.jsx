import instance from "./config";
export default {
  getUsuarios: () => {
    return instance.get("usuarios");
  },
  getUsuario: (id) => {
    return instance.get("usuarios/buscarId", { params: { id } });
  },
  createUsuarios: (usuario) => {
    return instance.post("usuarios", usuario);
  },
  updateUsuarios: (usuario) => {
    return instance.put("usuarios", usuario);
  },
  deleteUsuarios: (id) => {
    return instance.delete("usuarios", { data: { id } });
  },
  login: (usuario) => {
    return instance.post("/login", usuario);
  }

};
