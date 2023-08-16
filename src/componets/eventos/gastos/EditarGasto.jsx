/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Card, CardBody, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../../helpers/Notificaciones"
import apiServicios from "../../../api/apiServicios"
import useInventario from "../../../hooks/useInventario"
import useInsumosEvento from "../../../hooks/useInsumosEvento"
import useGastos from "../../../hooks/useGastos"
import { AiFillEdit } from "react-icons/ai"


const EditarGasto = ({ evento, actualizar, gasto }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const { updateGasto, actualizando } = useGastos(evento, actualizar)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            ...gasto,
        }
    })

    const onSubmit = (data) => {
        data.id_evento = evento
        updateGasto(data)
        reset()
        onCloseEvento()
    }

    return (
        <>
            <IconButton isRound colorScheme='blue' icon={<AiFillEdit size={'1.4rem'} />}
                onClick={() => {
                    onClickEvento()
                }}
            />
            <Modal isOpen={isOpen} onClose={onCloseEvento} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader pb={0}>Editar gasto</ModalHeader>
                    <ModalBody p={8}>
                        <form id="editar_gastos" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div >
                                    <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Gasto</p>

                                    <input
                                        name="nombre"
                                        id="nombre"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nombre del gasto"
                                        {
                                        ...register("nombre", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>

                                <div >
                                    <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Monto</p>

                                    <input
                                        type="number"
                                        name="monto"
                                        id="monto"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Total"
                                        {
                                        ...register("monto", {
                                            required: true,
                                            valueAsNumber: true
                                        })
                                        }
                                    />
                                </div>

                                <div >
                                    <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Fecha</p>

                                    <input
                                        type="datetime-local"
                                        name="fecha"
                                        step="1"
                                        id="fecha"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Fecha realizado"
                                        {
                                        ...register("fecha", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>

                                <div >
                                    <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Detalles</p>

                                    <input
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Detalles adicionales"
                                        {
                                        ...register("descripcion", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                            </div>

                            <Button w="100%" type="submit" form="editar_gastos" isLoading={actualizando}>
                                Editar
                            </Button>
                        </form >
                    </ModalBody>
                </ModalContent>
            </Modal >

        </>
    )
}

export default EditarGasto
