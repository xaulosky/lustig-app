/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiServicios from "../../api/apiServicios"


const AgregarServicio = ({ actualizar }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const crearEvento = (data) => {
        setEnviando(true)
        apiServicios.createServicio(data).then((res) => {
            onCloseEvento()
            reset()
            notificaciones.success("Servicio creado exitosamente")
            actualizar()
        }
        ).catch((err) => {
            notificaciones.error("Error al crear servicio")
        }
        ).finally(() => {
            setEnviando(false)
        }
        )
    }


    return (
        <>
            <form id="formulario_evento" onSubmit={handleSubmit(crearEvento)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">

                    <div className="col-span-2">
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
                            placeholder="Nombre del evento"
                            {
                            ...register("nombre", {
                                required: true,
                            })
                            }
                        />
                    </div>

                    <div className="col-span-2">
                        <label
                            htmlFor="descripcion"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Descripción
                        </label>
                        <textarea
                            type="area"
                            name="descripcion"
                            id="descripcion"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ubicación del evento"
                            {
                            ...register("descripcion")
                            }
                        />
                    </div>

                </div>
                <Button w="100%" type="submit" form="formulario_evento" isLoading={enviando}>
                    Crear Servicio
                </Button>
            </form>
        </>
    )
}

export default AgregarServicio
