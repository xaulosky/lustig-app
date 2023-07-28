import { Box, Button, Flex, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import PropTypes from 'prop-types'
import apiInventario from '../../../api/apiInventario'
import { notificaciones } from '../../../helpers/Notificaciones'

const EditarObjetoInventario = ({ objetoInventario, soloCantidad }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [cantidad, setCantidad] = useState(objetoInventario.cantidad)

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
        <Box>
            {soloCantidad ?
                <>
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
                </>
                :
                <>
                    {/* <IconButton
                        isRound
                        colorScheme="blue"
                        variant="solid"
                       
                    >
                    </IconButton> */}
                    <AiFillEdit onClick={onOpen} />
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
                </>
            }
        </Box>
    )
}

export default EditarObjetoInventario

EditarObjetoInventario.propTypes = {
    objetoInventario: PropTypes.object.isRequired,
    soloCantidad: PropTypes.bool
}