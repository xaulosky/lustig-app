import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Editable, EditableInput, EditablePreview, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Spinner } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { GrView } from "react-icons/gr"
import { Link } from "react-router-dom"
import { notificaciones } from "../helpers/Notificaciones"
import { BiDownArrow } from "react-icons/bi"
import { Tooltip } from '@chakra-ui/react'
import { get, set } from "react-hook-form"
import apiServicios from "../api/apiServicios"
import AgregarServicio from "../componets/servicios/AgregarServicio"
import { AiFillDelete } from "react-icons/ai"
import Swal from "sweetalert2"
import EditarServicio from "../componets/servicios/EditarServicio"
import apiPersonal from "../api/apiPersonal"
import AgregarPersonal from "../componets/personal/AgregarPersonal"
import EditarPersonal from "../componets/personal/EditarPersonal"

const Servicios = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const onClickEliminarServicio = (id) => {
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
                apiPersonal.deletePersonal(id).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Personal eliminado',
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
                    text: 'El personal no ha sido eliminado',
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
                selector: row => row.nombre
            },
            {
                name: "Apellido",
                selector: row => row.apellido

            },
            {
                name: "Area",
                selector: row => row.area.nombre
            },
            {
                name: "Telefono",
                selector: row => row.telefono
            },
            {
                name: "Direccion",
                selector: row => row.direccion

            },
            {
                name: "Acciones",
                right: true,
                cell: (row) => {
                    return (
                        <>
                            <EditarPersonal actualizar={getData} row={row} />
                            <AiFillDelete onClick={() => onClickEliminarServicio(row.id)} className="cursor-pointer text-lg" />
                        </>
                    )
                }
            },
        ]
    }, [])

    const getData = useCallback(() => {

        apiPersonal.getPersonal().then((res) => {
            setData(res.data)
            console.log(res.data)
            if (res.data.length === 0) {
                notificaciones.error("No hay personal")
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
                <Heading size="sm" className="p-1" >Agregar Personal</Heading>
                <Card>
                    <CardBody>
                        <AgregarPersonal actualizar={getData} />
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
                    <Heading>Personal</Heading>
                    <Input w="50%" placeholder="Buscar" onChange={

                        (e) => {
                            if (e.target.value.length > 0) {
                                apiPersonal.getPersonal().then((res) => {
                                    setData(res.data.filter((personal) => {
                                        return personal.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                            || personal.apellido.toLowerCase().includes(e.target.value.toLowerCase())
                                    }))
                                    if (res.data.length === 0) {
                                        notificaciones.error("No hay personal")
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
                        titulo={"Personal"}
                    />
                </Card>
            </GridItem>
        </Grid>
    )
}

export default Servicios