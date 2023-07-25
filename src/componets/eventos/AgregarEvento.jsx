import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import apiEventos from "../../api/apiEventos"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { Form, useForm } from "react-hook-form"
import { Textarea } from '@chakra-ui/react'


const AgregarEvento = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const crearEvento = (data) => {
        console.log(data)
    }

    return (
        <>
            <Button onClick={() => onClickEvento()} className="bg-blue-900 ">
                <GrFormAdd /> Agregar Evento
            </Button>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id="formulario_evento" onSubmit={handleSubmit(crearEvento)}>
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
                                        placeholder="Ubicación del evento"
                                        {
                                        ...register("direccion", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="presupuesto"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Presupuesto
                                    </label>
                                    <input
                                        type="number"
                                        name="presupuesto"
                                        id="presupuesto"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Presupuesto del evento"
                                        {
                                        ...register("presupuesto", {
                                            required: true,
                                        })
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="id_tipo_evento"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tipo de evento
                                    </label>
                                    <select
                                        id="id_tipo_evento"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {
                                        ...register("id_tipo_evento", {
                                            required: true,
                                        })

                                        }
                                    >
                                        <option selected value="1">Matrimonio</option>
                                        <option value="2">Cumpleaños</option>
                                        <option value="3">Bautizo</option>
                                        <option value="4">Empresarial</option>
                                        <option value="5">Otro</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        rows={5}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Descripción del evento"
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
                        <Button colorScheme='blue' mr={3} type="submit" form="formulario_evento">
                            Crear Evento
                        </Button>
                        <Button variant='ghost' onClick={onCloseEvento}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AgregarEvento