import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"
import useClientes from "../../hooks/useClientes"

const AgregarCliente = ({ actualizar }) => {

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const crearCliente = (data) => {
        setEnviando(true)
        apiClientes.createCliente(data).then((res) => {
            console.log(res)
            reset()
            notificaciones.success("Cliente creado exitosamente")
            /* actualizar() */

        }
        ).catch((err) => {
            console.log(err)
            notificaciones.error("Error al crear cliente")
        }).finally(() => {
            setEnviando(false)
            apiClientes.getClientes().then((res) => {
                actualizar()
            }
            ).catch((err) => {
                console.log(err)
            }
            )
        })
    }

    return (
        <form id="formulario_cliente" onSubmit={handleSubmit(crearCliente)}>
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
                        placeholder="Nombre del cliente"
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
                        placeholder="Apellido del cliente"
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
                        placeholder="Rut del cliente"
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
                        placeholder="Teléfono del cliente"
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
            <Button w="100%" mr={3} type="submit" form="formulario_cliente" isLoading={enviando}>
                Crear Cliente
            </Button>
        </form>
    )
}

export default AgregarCliente