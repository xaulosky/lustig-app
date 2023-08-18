import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Editable, EditableInput, EditablePreview, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Spinner } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { GrView } from "react-icons/gr"
import { Link } from "react-router-dom"
import { notificaciones } from "../helpers/Notificaciones"
import { BiDownArrow } from "react-icons/bi"
import { Tooltip } from '@chakra-ui/react'
import { get, set } from "react-hook-form"
import { AiFillDelete } from "react-icons/ai"
import Swal from "sweetalert2"
import apiUsuarios from "../api/apiUsuarios"
import AgregarUsuarios from "../componets/usuarios/AgregarUsuarios"
import EditarUsuario from "../componets/usuarios/EditarUsuario"

const Usuarios = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const onClickEliminarUsuario = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1D4ED8',
            cancelButtonColor: '#E11D48',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                apiUsuarios.deleteUsuarios(id).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario eliminado',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    })
                }).then(() => {
                    getData()
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancelado',
                    text: 'El usuario no ha sido eliminado',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }
        }
        )
    }


    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: "nombre"
            },
            {
                name: "email",
                selector: "email",
            },
            {
                name: "Acciones",
                right: true,
                cell: (row) => {
                    return (
                        <>
                            <EditarUsuario actualizar={getData} row={row} />
                            <AiFillDelete onClick={() => onClickEliminarUsuario(row.id)} className="cursor-pointer text-lg" />
                        </>
                    )
                }
            },


        ]
    }, [])

    const getData = useCallback(() => {

        apiUsuarios.getUsuarios().then((res) => {
            setData(res.data)
            if (res.data.length === 0) {
                notificaciones.error("No hay usuarios")
            }
        }
        )
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 2,
                }
            }>
                <Heading size="sm" className="p-1" >Agregar Usuario</Heading>
                <Card>
                    <CardBody>
                        <AgregarUsuarios actualizar={getData} />
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 4,
                }
            }>
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading>Usuarios</Heading>
                    <Input w="50%" placeholder="Buscar" onChange={
                        (e) => {
                            if (e.target.value.length > 0) {
                                apiUsuarios.getUsuarios().then((res) => {
                                    setData(res.data.filter((usuario) => {
                                        return usuario.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                    }))
                                    if (res.data.length === 0) {
                                        notificaciones.error("No hay usuarios")
                                    }
                                }).finally(() => {
                                    setCargando(false)
                                })
                            }
                        }
                    } />
                </Flex>
                <br />
                <Card>
                    <Tabla
                        data={data}
                        columnas={columns}
                        titulo={"Usuarios"}
                    />
                </Card>
            </GridItem>
        </Grid>
    )
}

export default Usuarios