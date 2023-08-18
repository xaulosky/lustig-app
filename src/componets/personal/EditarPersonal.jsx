import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BiSolidEdit } from "react-icons/bi"
import apiEventos from "../../api/apiEventos"
import { notificaciones } from "../../helpers/Notificaciones"
import apiClientes from "../../api/apiClientes"
import apiServicios from "../../api/apiServicios"
import apiPersonal from "../../api/apiPersonal"

const EditarPersonal = ({ row, actualizar }) => {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => { setIsOpen(false); reset(); }
    const onClick = () => setIsOpen(true)

    const [enviando, setEnviando] = useState(false)
    const [areas, setAreas] = useState([])

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const editarPersonal = (data) => {
        setEnviando(true)
        apiPersonal.updatePersonal({
            ...data,
            id: row.id
        }).then((res) => {
            onClose()
            notificaciones.success("Personal editado exitosamente")
        }
        ).catch((err) => {
            console.log(err);
            onClose()
            notificaciones.error("Error al editar personal")
        }
        ).finally(() => {
            setEnviando(false)
            reset()
            actualizar()
            onClose()
        }
        )

    }

    const obtenerAreas = () => {
        apiPersonal.getAreas().then((res) => {
            setAreas(res.data)
        }
        ).catch((err) => {
            console.log(err)
        }
        )
    }

    useEffect(() => {
        obtenerAreas()
    }, [])

    return (
        <>
            <BiSolidEdit onClick={() => onClick()} className="cursor-pointer text-lg" />
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Personal</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        {/* 
            nombre, apellido, area, telefono, direccion
        */}

                        <form id="formulario_editar_personal" onSubmit={handleSubmit(editarPersonal)}>
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
                                        placeholder="Apellido"
                                        {
                                        ...register("apellido", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="area"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Area
                                    </label>
                                    {/* select area */}
                                    <select
                                        id="area"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {
                                        ...register("id_area")
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
                                <div>
                                    <label
                                        htmlFor="telefono"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Telefono
                                    </label>
                                    <input
                                        defaultValue={row.telefono}
                                        type="text"
                                        name="telefono"
                                        id="telefono"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Telefono"
                                       /*  {
                                        ...register("telefono", {
                                            required: true,
                                        })
                                        } */
                                    />
                                </div>
                                <div  className="col-span-2">
                                    <label
                                        htmlFor="direccion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Direccion
                                    </label>
                                    <input
                                        defaultValue={row.direccion}
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Direccion"
                                        /* {
                                        ...register("direccion", {
                                            required: true,
                                        })
                                        } */
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={enviando} colorScheme='blue' mr={3} type="submit" form="formulario_editar_personal" isLoading={enviando}>
                            Editar Personal
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default EditarPersonal