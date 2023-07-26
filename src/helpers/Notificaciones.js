import Swal from "sweetalert2";

export const notificaciones = {
  error: (titulo, mensaje = "", mayus = false) => {
    Swal.fire({
      icon: "error",
      title: mayus ? titulo.toUpperCase() : titulo,
      text: mensaje,
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      color: "white",
      background: "#cc0000",
      iconColor: "white",
    });
  },
  success: (titulo, mensaje = "") => {
    Swal.fire({
      icon: "success",
      title: titulo,
      text: mensaje,
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      color: "white",
      iconColor: "white",
      background: "green",
    });
  },
  warning: (titulo, mensaje = "") => {
    Swal.fire({
      icon: "warning",
      title: titulo,
      text: mensaje,
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      color: "white",
      iconColor: "white",
      background: "#7CB9E8",
    });
  },
};