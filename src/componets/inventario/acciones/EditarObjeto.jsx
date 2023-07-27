import { Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import PropTypes from 'prop-types'
import apiInventario from '../../../api/apiInventario'
import { notificaciones } from '../../../helpers/Notificaciones'
import axios from 'axios'

const EditarObjetoInventario = ({ objetoInventario, soloCantidad }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [cantidad, setCantidad] = React.useState(objetoInventario.cantidad)

    const EditarObjeto = async () => {
        apiInventario.updateObjetoInventario({ ...objetoInventario, cantidad }).then(() => {
            notificaciones.success("Objeto editado")
        }).catch((err) => {
            notificaciones.error(err.data?.message || "Error al editar objeto")
            console.log(err)
        }).finally(() => {
            onClose()
        })
    }
    return (
        <React.Fragment>

            {soloCantidad ?
                <React.Fragment>
                    <Flex alignItems="center">
                        <Button onClick={onOpen}>
                            <span>{objetoInventario.cantidad}</span>
                            <span className="ml-2 text-gray-500">{objetoInventario.unidad_medida || "Unidades"}</span>
                        </Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edición</ModalHeader>
                            <ModalBody pt={0} pb={5}>
                                <Text py={2}>Cantidad</Text>
                                <Input type='number' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            </ModalBody>
                            <Button onClick={EditarObjeto}>Editar</Button>
                        </ModalContent>
                    </Modal>
                </React.Fragment>
                :
                <React.Fragment>
                    <IconButton
                        isRound
                        colorScheme="blue"
                        variant="solid"
                        onClick={onOpen}
                    >
                        <AiFillEdit />
                    </IconButton>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edición</ModalHeader>
                            <ModalBody pt={0} pb={5}>
                                {/* <Text py={2}>Nombre</Text>
                                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <Text py={2}>Nombre</Text>
                                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <Text py={2}>Nombre</Text>
                                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <Text py={2}>Nombre</Text>
                                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} /> */}
                            </ModalBody>
                        </ModalContent>
                    </Modal >
                </React.Fragment>
            }
        </React.Fragment >
    )
}

export default EditarObjetoInventario

EditarObjetoInventario.propTypes = {
    objetoInventario: PropTypes.object.isRequired,
    soloCantidad: PropTypes.bool
}