import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"

const AgregarCliente = () => {


    const [isOpen, setIsOpen] = useState(false)
    const onCloseCliente = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const crearCliente = (data) => {
        setEnviando(true)
        apiClientes.createCliente(data).then((res) => {
            console.log(res)
            onCloseCliente()
            reset()
            notificaciones.success("Evento creado exitosamente")
            /* actualizar() */
        }
        ).catch((err) => {
            console.log(err)
            notificaciones.error("Error al crear evento")
        }).finally(() => {
            setEnviando(false)
        })
    }


    return (
        <>
            <Button onClick={() => onClickEvento()} colorScheme="blue" borderRadius="0" className="text-white">
                <GrFormAdd />
            </Button>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Cliente</ModalHeader>
                    <ModalCloseButton onClick={onCloseCliente} />
                    <ModalBody>
                        <form id="formulario_evento" onSubmit={handleSubmit(crearCliente)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                                        type="text"
                                        name="apellido"
                                        id="apellido"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nombre del evento"
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
                                        type="number"
                                        name="telefono"
                                        id="telefono"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Teléfono del evento"
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
                                        type="number"
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
                        <Button colorScheme='blue' mr={3} type="submit" form="formulario_evento" isLoading={enviando}>
                            Crear Evento
                        </Button>
                        <Button variant='ghost' onClick={onCloseCliente}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default AgregarCliente

