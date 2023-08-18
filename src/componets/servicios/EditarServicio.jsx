import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BiSolidEdit } from "react-icons/bi"
import apiEventos from "../../api/apiEventos"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"
import apiServicios from "../../api/apiServicios"

const EditarServicio = ({ row, actualizar }) => {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => { setIsOpen(false); reset(); }
    const onClick = () => setIsOpen(true)

    const [enviando, setEnviando] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const editarServicio = (data) => {
        setEnviando(true)
        apiServicios.updateServicio({
            ...data,
            id: row.id
        }).then((res) => {
            onClose()
            notificaciones.success("Servicio editado exitosamente")
        }
        ).catch((err) => {
            console.log(err);
            onClose()
            notificaciones.error("Error al editar servicio")
        }
        ).finally(() => {
            setEnviando(false)
            reset()
            actualizar()
            onClose()
        }
        )

    }

    return (
        <>
            <BiSolidEdit onClick={() => onClick()} className="cursor-pointer text-lg" />
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Servicio</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <form id="formulario_editar_servicio" onSubmit={handleSubmit(editarServicio)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="nombre"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        defaultValue={row.nombre}
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
                                        defaultValue={row.descripcion}
                                        type="area"
                                        name="descripcion"
                                        id="descripcion"
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Descripción del servicio"
                                        {
                                        ...register("descripcion", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={enviando} colorScheme='blue' mr={3} type="submit" form="formulario_editar_servicio" isLoading={enviando}>
                            Editar Evento
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarServicio