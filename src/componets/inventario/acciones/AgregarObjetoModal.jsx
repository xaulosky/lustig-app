import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import apiInventario from "../../../api/apiInventario"
import { notificaciones } from "../../../helpers/Notificaciones"
import { BsPlus } from "react-icons/bs";

import PropTypes from 'prop-types'

const AgregarObjetoInventarioModal = ({ actualizar }) => {


    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const crearObjeto = (data) => {
        setEnviando(true)
        apiInventario.createObjetoInventario(data)
            .then((res) => {
                console.log(res)
                onClose()
                reset()
                actualizar()
                notificaciones.success("Agregado creado exitosamente")
            }
            ).catch((err) => {
                console.log(err)
                notificaciones.error("Error al crear")
            }).finally(() => {
                setEnviando(false)
            })
    }


    return (
        <>
            <Button onClick={() => onClickEvento()} colorScheme="blue" borderRadius="0" className="text-white">
                <BsPlus color="inherit" fill="white" />&nbsp;&nbsp;Agregar
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar al Inventario</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <form id="formulario_inventario" onSubmit={handleSubmit(crearObjeto)}>
                            <div className="flex flex-col column gap-4 mb-4 sm:grid-cols-1">
                                <div>
                                    <label
                                        htmlFor="nombre"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nombre"
                                        {
                                        ...register("nombre", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="cantidad"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        name="cantidad"
                                        id="cantidad"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Cantidad"
                                        {
                                        ...register("cantidad", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Descripción"
                                        {
                                        ...register("descripcion", {
                                            required: false,
                                        })
                                        }
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="tipo"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                                    >
                                        Categoría
                                    </label>
                                    <input
                                        type="text"
                                        name="tipo"
                                        id="tipo"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Categoría"
                                        {
                                        ...register("tipo", {
                                            required: false,
                                        })
                                        }
                                    />
                                </div>

                            </div>

                        </form>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit" form="formulario_inventario" isLoading={enviando}>
                            Crear
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default AgregarObjetoInventarioModal

AgregarObjetoInventario.propTypes = {
    actualizar: PropTypes.func.isRequired
}