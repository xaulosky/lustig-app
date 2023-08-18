import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import apiInventario from "../../../api/apiInventario"
import { notificaciones } from "../../../helpers/Notificaciones"
const AgregarObjeto = ({ actualizar, tipos }) => {

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const crearObjeto = (data) => {
        setEnviando(true)
        apiInventario.createObjetoInventario(data)
            .then((res) => {
                console.log(res)
                reset()
                actualizar()
                notificaciones.success("Objeto creado exitosamente")
            }
            ).catch((err) => {
                console.log(err)
                notificaciones.error("Error al crear")
            }).finally(() => {
                setEnviando(false)
            })
    }

    return (
        <form id="formulario_inventario" onSubmit={handleSubmit(crearObjeto)}>
            <div className="flex flex-col column gap-4 mb-4 sm:grid-cols-1">
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
                        placeholder="Nombre"
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
                        type="number"
                        name="cantidad"
                        id="cantidad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Cantidad"
                        {
                        ...register("cantidad", {
                            required: true,
                        })
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="descripcion"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Descripción
                    </label>
                    <input
                        type="text"
                        name="descripcion"
                        id="descripcion"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Descripción"
                        {
                        ...register("descripcion", {
                            required: false,
                        })
                        }
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="tipo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                    >
                        Categoría
                    </label>
                    <input
                        list="tipos"
                        name="tipo"
                        id="tipo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Categoría"
                        {
                        ...register("tipo", {
                            required: false,
                        })
                        }
                    />
                    <datalist id="tipos">
                        {tipos.map((tipo) => (
                            <option key={tipo} value={tipo}  > {tipo} </option>
                        ))}
                    </datalist>

                </div>
                <Button w="100%" mr={3} type="submit" form="formulario_inventario" isLoading={enviando}>
                    Crear
                </Button>
            </div>
        </form>
    )
}

export default AgregarObjeto