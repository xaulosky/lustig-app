import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillDelete } from "react-icons/ai"
import Swal from "sweetalert2"
import apiEventos from "../../api/apiEventos"
import apiClientes from "../../api/apiClientes"
const EliminarCliente = ({ id, actualizar }) => {

    const onClickEliminarCliente = () => {
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
                apiClientes.deleteCliente(id).then((res) => {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'Cliente eliminado',
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
                    text: 'El cliente no ha sido eliminado',
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
            <AiFillDelete onClick={() => onClickEliminarCliente()} className="cursor-pointer text-lg" />
        </>
    )
}

export default EliminarCliente