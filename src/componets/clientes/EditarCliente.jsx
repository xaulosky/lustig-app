import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BiSolidEdit } from "react-icons/bi"
import apiEventos from "../../api/apiEventos"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"

const EditarCliente = ({ row, actualizar }) => {

    const [isOpen, setIsOpen] = useState(false)
    const onCloseEditarEvento = () => { setIsOpen(false) }
    const onClickEditarEvento = () => setIsOpen(true)


    const [enviando, setEnviando] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const editarCliente = (data) => {
        setEnviando(true)
        apiClientes.updateCliente({
            ...data,
            id: row.id
        }).then((res) => {
            onCloseEditarEvento()
            notificaciones.success("Cliente editado exitosamente")
        }
        ).catch((err) => {
            console.log(err);
            onCloseEditarEvento()
            notificaciones.error("Error al editar cliente")
        }
        ).finally(() => {
            setEnviando(false)
            reset()
            actualizar()
            onCloseEditarEvento()
        }
        )

    }

    return (
        <>
            <BiSolidEdit onClick={() => onClickEditarEvento()} className="cursor-pointer text-lg" />
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Cliente </ModalHeader>
                    <ModalCloseButton onClick={onCloseEditarEvento} />
                    <ModalBody>
                        <form id="formulario_editar_cliente" onSubmit={handleSubmit(editarCliente)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">

                                <div>
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
                                <div>
                                    <label
                                        htmlFor="apellido"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Apellido
                                    </label>
                                    <input
                                        defaultValue={row.apellido}
                                        type="text"
                                        name="apellido"
                                        id="apellido"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Apellido Cliente"
                                        {
                                        ...register("apellido", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="rut"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Rut
                                    </label>
                                    <input
                                        defaultValue={row.rut}
                                        type="text"
                                        name="rut"
                                        id="rut"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Ubicación del evento"
                                        {
                                        ...register("rut", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="telefono"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Teléfono
                                    </label>
                                    <input
                                        defaultValue={row.telefono}
                                        type="text"
                                        name="telefono"
                                        id="telefono"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Ubicación del evento"
                                        {
                                        ...register("telefono", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="direccion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        defaultValue={row.direccion}
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Dirección del cliente"
                                        {
                                        ...register("direccion", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>

                            </div>

                        </form>

                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={enviando} colorScheme='blue' mr={3} type="submit" form="formulario_editar_cliente" isLoading={enviando}>
                            Editar Evento
                        </Button>
                        <Button variant='ghost' onClick={onCloseEditarEvento}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarCliente