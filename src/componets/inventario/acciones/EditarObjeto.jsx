import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BiSolidEdit } from "react-icons/bi"
import apiInventario from "../../../api/apiInventario"
import { notificaciones } from "../../../helpers/Notificaciones"

const EditarObjeto = ({ row, actualizar, tipos }) => {

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
        apiInventario.updateObjetoInventario({
            ...data,
            id: row.id
        }).then((res) => {
            onClose()
            notificaciones.success("Objeto editado exitosamente")
        }
        ).catch((err) => {
            console.log(err);
            onClose()
            notificaciones.error("Error al editar objeto")
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
                    <ModalHeader>Editar Objeto</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <form id="formulario_editar_objeto" onSubmit={handleSubmit(editarServicio)}>
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
                                        placeholder="Nombre del objeto"
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
                                        defaultValue={row.cantidad}
                                        type="number"
                                        name="cantidad"
                                        id="cantidad"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Cantidad de objetos"
                                        {
                                        ...register("cantidad", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="tipo"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Categoría
                                    </label>
                                    <input
                                        defaultValue={row.tipo}
                                        name="tipo"
                                        list="tipos"
                                        id="tipo"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Categoría del objeto"
                                        {
                                        ...register("tipo", {
                                            required: true,
                                        })
                                        }
                                    />
                                    <datalist id="tipos">
                                        {tipos.map((tipo) => (
                                            <option key={tipo} value={tipo}  > {tipo} </option>
                                        ))}
                                    </datalist>

                                </div>

                                <div>
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Descripción
                                    </label>
                                    <input
                                        defaultValue={row.descripcion}
                                        name="descripcion"
                                        id="descripcion"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Categoría del objeto"
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
                        <Button isLoading={enviando} colorScheme='blue' mr={3} type="submit" form="formulario_editar_objeto" isLoading={enviando}>
                            Editar Evento
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarObjeto