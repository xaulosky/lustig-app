import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillDelete } from "react-icons/ai"
import Swal from "sweetalert2"
import apiEventos from "../../api/apiEventos"
const EliminarEvento = ({ id, actualizar }) => {

  const onClickEliminarEvento = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1D4ED8',
      cancelButtonColor: '#E11D48',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiEventos.deleteEvento(id).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Evento eliminado',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
        }).then(() => {
          actualizar()
        })

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Cancelado',
          text: 'El evento no ha sido eliminado',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        })
      }
    }
    )
  }

  return (
    <>
      <AiFillDelete onClick={() => onClickEliminarEvento()} className="cursor-pointer text-lg" />
    </>
  )
}

export default EliminarEvento