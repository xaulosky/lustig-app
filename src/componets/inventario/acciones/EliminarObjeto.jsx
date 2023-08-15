import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillDelete } from "react-icons/ai"
import Swal from "sweetalert2"
import apiInventario from "../../../api/apiInventario"

const EliminarObjeto = ({ id, actualizar }) => {

    const onClickEliminarObjeto = () => {
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
                apiInventario.deleteObjetoInventario(id).then((res) => {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'Objeto eliminado',
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
                    text: 'El objeto no ha sido eliminado',
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
            <AiFillDelete onClick={() => onClickEliminarObjeto()} className="cursor-pointer text-lg" />
        </>
    )
}

export default EliminarObjeto