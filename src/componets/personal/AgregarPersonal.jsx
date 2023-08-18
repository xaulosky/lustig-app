import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"
import useClientes from "../../hooks/useClientes"
import { formatRut } from "react-rut-formatter"
import apiPersonal from "../../api/apiPersonal"

const AgregarPersonal = ({ actualizar }) => {

    const [enviando, setEnviando] = useState(false)
    const [rut, setRut] = useState("")
    const [areas, setAreas] = useState([])


    const {
        register,
        handleSubmit,
        reset,
    } = useForm()


    const obtenerAreas = () => {
        apiPersonal.getAreas().then((res) => {
            setAreas(res.data)
        }
        ).catch((err) => {
            console.log(err)
        }
        )
    }

    const crearPersonal = (data) => {
        setEnviando(true)
        apiPersonal.createPersonal({
            ...data,
            rut: rut
        }).then((res) => {
            console.log(res)
            reset()
            notificaciones.success("Personal crear exitosamente")
            actualizar()

        }
        ).catch((err) => {
            console.log(err)
            notificaciones.error("Error al crear personal")
        }).finally(() => {
            /* setEnviando(false)
            apiPersonal.getPersonal().then((res) => {
                actualizar()
            }
            ).catch((err) => {
                console.log(err)
            }
            ) */
        })
    }

    /*  {
         apellido
         :
         "apellidito2"
         area
         :
         { id: 1, nombre: 'Garzones' }
         direccion
         :
         "Direccion"
         id
         :
         1
         id_area
         :
         1
         nombre
         :
         "Garzon"
         rut
         :
         null
         telefono
         :
         "1654622"
     } */

    useEffect(() => {
        obtenerAreas()
    }, [])

    return (
        <form id="formulario_cliente" onSubmit={handleSubmit(crearPersonal)}>
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
                        htmlFor="direccion"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                        ...register("direccion")
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
                        type="text"
                        name="telefono"
                        id="telefono"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Teléfono del cliente"
                        {
                        ...register("telefono")
                        }
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="area"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Area
                    </label>
                    <select
                        id="area"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {
                        ...register("area")
                        }
                    >
                        {
                            areas.map((area) => {
                                return (
                                    <option key={area.id} value={area.id}>{area.nombre}</option>
                                )
                            })
                        }
                    </select>
                </div>

            </div>
            <Button w="100%" mr={3} type="submit" form="formulario_cliente" isLoading={enviando}>
                Crear Personal
            </Button>
        </form>
    )
}

export default AgregarPersonal