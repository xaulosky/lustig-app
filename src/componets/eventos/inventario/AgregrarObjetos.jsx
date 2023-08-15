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


const AgregarObjetos = ({ evento, actualizar }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const { inventario } = useInventario()

    const { cargando, createInsumoEvento } = useInsumosEvento(evento, actualizar)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        data.id_evento = evento
        createInsumoEvento(data)
        reset()
    }

    return (
        <>
            <form id="formulario_inventario" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">

                    <div>
                        <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Inventario</p>

                        <input
                            list="inventario"
                            type="text"
                            name="id_inventario"
                            id="id_inventario"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Inventario"
                            {
                            ...register("id_inventario", {
                                required: true,
                            })
                            }

                        />
                        <datalist id="inventario">
                            {
                                inventario.map((inventario) => {
                                    return (
                                        <option key={inventario.id} value={inventario.id}>{inventario.nombre} {inventario.cantidad} {inventario.unidad_de_medida} </option>
                                    )
                                })
                            }
                        </datalist>
                    </div>

                    <div >
                        <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">Cantidad</p>

                        <input
                            type="number"
                            name="cantidad_a_usar"
                            id="cantidad_a_usar"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Cantidad a usar"
                            {
                            ...register("cantidad_a_usar", {
                                required: true,
                            })
                            }
                        />
                    </div>

                </div>
                <Button w="100%" type="submit" form="formulario_inventario" isLoading={cargando}>
                    Agregar a Evento
                </Button>
            </form>
        </>
    )
}

export default AgregarObjetos
