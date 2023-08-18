/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { GrFormAdd } from 'react-icons/gr'
import { useForm } from "react-hook-form"
import { notificaciones } from "../../helpers/Notificaciones"
import apiServicios from "../../api/apiServicios"
import apiUsuarios from "../../api/apiUsuarios"


const AgregarUsuario = ({ actualizar }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onCloseEvento = () => setIsOpen(false)
    const onClickEvento = () => setIsOpen(true)

    const [repeatPassword, setRepeatPassword] = useState("")

    const [enviando, setEnviando] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()


    const onChangePassword = (e) => {
        setRepeatPassword(e.target.value)
    }

    const crearEvento = (data) => {
        console.log(data.password, repeatPassword)
        if (data.password !== repeatPassword) {
            notificaciones.error("Las contraseñas no coinciden")

            return
        }

        setEnviando(true)
        apiUsuarios.createUsuarios({
            ...data,
            password_confirmation: data.password
        }).then((res) => {
            console.log(res);
            onCloseEvento()
            reset()
            notificaciones.success("Usuario creado exitosamente")
            actualizar()
        }
        ).catch((err) => {
            console.log(err);
            notificaciones.error("Error al crear usuario")
        }
        ).finally(() => {
            setEnviando(false)
        }
        )
    }

    return (
        <>
            {/* nombre, email, password, id_tipo_usuario */}
            <form id="agregar_usuario" onSubmit={handleSubmit(crearEvento)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">

                    <div className="col-span-2">
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
                    {/* email */}
                    <div className="col-span-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="email"
                            {
                            ...register("email", {
                                required: true,
                            })
                            }
                        />
                    </div>
                    {/* password */}
                    <div className="col-span-2">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="password"
                            {
                            ...register("password", {
                                required: true,
                            })
                            }
                        />

                    </div>
                    {/* repeat password */}
                    <div className="col-span-2">
                        <label
                            htmlFor="repeat_password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Repetir password
                        </label>
                        <input
                            onChange={onChangePassword}
                            type="password"
                            name="repeat_password"
                            id="repeat_password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Repetir password"
                        /* {
                        ...register("password_confirmation", {
                            required: true,
                        })
                        } */
                        />
                    </div>

                    {/* select id_tipo_usuario 1 "Administrador" 2 "Empleado" */}
                    <div className="col-span-2">
                        <label
                            htmlFor="id_tipo_usuario"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tipo de usuario
                        </label>
                        <select
                            name="id_tipo_usuario"
                            id="id_tipo_usuario"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            {
                            ...register("id_tipo_usuario", {
                                required: true,
                            })
                            }
                        >
                            <option value="1">Administrador</option>
                            <option value="2">Empleado</option>
                        </select>
                    </div>


                </div>
                <Button w="100%" type="submit" form="agregar_usuario" isLoading={enviando}>
                    Crear Servicio
                </Button>
            </form>
        </>
    )
}

export default AgregarUsuario
