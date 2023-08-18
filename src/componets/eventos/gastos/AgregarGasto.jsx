/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../../helpers/Notificaciones"
import apiServicios from "../../../api/apiServicios"
import useInventario from "../../../hooks/useInventario"
import useInsumosEvento from "../../../hooks/useInsumosEvento"
import useGastos from "../../../hooks/useGastos"


const AgregarGasto = ({ evento, actualizar }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const { createGasto, actualizando } = useGastos(null, actualizar)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        data.id_evento = evento
        createGasto(data)
        reset()
    }

    /* fecha actual por defecto */
    const fechaActual = () => {
        const fecha = new Date()
        const dia = fecha.getDate()
        const mes = fecha.getMonth() + 1
        const anio = fecha.getFullYear()
        const hora = fecha.getHours()
        const minutos = fecha.getMinutes()

        return `${anio}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}T${hora < 10 ? `0${hora}` : hora}:${minutos < 10 ? `0${minutos}` : minutos}`
    }

    

    return (
        <>
            <form id="form_gastos" onSubmit={handleSubmit(onSubmit)}>
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
                            defaultValue={fechaActual()}
                            name="fecha"
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
                            /* {
                            ...register("descripcion", {
                                required: true,
                            })
                            } */
                        />
                    </div>
                </div>

                <Button w="100%" type="submit" form="form_gastos" isLoading={actualizando}>
                    Agregar a Evento
                </Button>
            </form >
        </>
    )
}

export default AgregarGasto
