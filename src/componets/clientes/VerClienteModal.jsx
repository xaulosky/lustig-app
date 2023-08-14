import { Button, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd, GrView } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"
import useClientes from "../../hooks/useClientes"

const VerClienteModal = ({ row }) => {

    const [isOpen, setIsOpen] = useState(false)
    const onCloseCliente = () => setIsOpen(false)
    const onClickVerCliente = () => setIsOpen(true)


    return (
        <>
            <GrView onClick={() => onClickVerCliente()} className="cursor-pointer text-lg" />
            <Modal isOpen={isOpen} onClose={onCloseCliente} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Cliente</ModalHeader>
                    <ModalCloseButton onClick={onCloseCliente} />
                    <ModalBody>
                        <ul>
                            <li> <b>Nombre:</b> {row.nombre + ' ' + row.apellido}</li>
                            <li> <b>Rut:</b> {row.rut}</li>
                            <li> <b>Teléfono:</b> {row.telefono}</li>
                            <li> <b>Dirección:</b> {row.direccion}</li>
                        </ul>

                    </ModalBody>

                    <ModalFooter>

                        <Button variant='ghost' onClick={onCloseCliente}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default VerClienteModal

