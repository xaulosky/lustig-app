import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Checkbox, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Stack } from "@chakra-ui/react"
import apiEventos from "../api/apiEventos"
import { useCallback, useEffect, useMemo, useState } from "react"
import AgregarEvento from "../componets/eventos/AgregarEvento"
import EditarEvento from "../componets/eventos/EditarEvento"
import { GrView } from "react-icons/gr"
import { Link } from "react-router-dom"
import EliminarEvento from "../componets/eventos/EliminarEvento"
import useClientes from "../hooks/useClientes"
import { notificaciones } from "../helpers/Notificaciones"
import { BiDownArrow } from "react-icons/bi"
import { Tooltip } from '@chakra-ui/react'
import { set } from "react-hook-form"
import apiClientes from "../api/apiClientes"
import AgregarCliente from "../componets/clientes/AgregarCliente"
import EliminarCliente from "../componets/clientes/EliminarCliente"
import EditarCliente from "../componets/clientes/EditarCliente"
import VerClienteModal from "../componets/clientes/VerClienteModal"

const Clientes = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    const [isLoading, setIsLoading] = useState(false)


    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: "nombre"
            },
            {
                name: "Apellido",
                selector: "apellido"
            },
            {
                name: "Rut",
                selector: "rut"
            },
            {
                name: "Telefono",
                selector: "telefono"

            },
            {
                name: "Direccion",
                selector: "direccion"
            },
            {
                name: "Acciones",
                cell: (row) => {
                    return (
                        <HStack>
                            <EditarCliente row={row} actualizar={getData} />
                            <VerClienteModal row={row} />
                            <EliminarCliente id={row.id} actualizar={getData} />
                        </HStack>
                    )
                },
                right: true
            }

        ]
    }, [])

    const getData = useCallback(() => {
        setCargando(true)
        apiClientes.getClientes().then((res) => {
            setData(res.data)
            console.log(res.data)
            if (res.data.length === 0) {
                notificaciones.error("No hay eventos")
            }
        }).finally(() => {
            setCargando(false)
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
                <Heading size={"sm"} className="p-1" >Agregar Cliente</Heading>
                <Card>
                    <CardBody>
                        <AgregarCliente actualizar={getData} />
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
                    <Heading>Clientes</Heading>
                    <Input w="50%" placeholder="Buscar" onChange={
                        (e) => {
                            if (e.target.value.length > 0) {
                                apiClientes.getClientes().then((res) => {
                                    setData(res.data.filter((cliente) => {
                                        return cliente.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                            || cliente.apellido.toLowerCase().includes(e.target.value.toLowerCase())
                                            || cliente.rut.toLowerCase().includes(e.target.value.toLowerCase())
                                    }))
                                    if (res.data.length === 0) {
                                        notificaciones.error("No hay eventos")
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
                        titulo={"Eventos"}
                    />
                </Card>
            </GridItem>
        </Grid>
    )
}

export default Clientes