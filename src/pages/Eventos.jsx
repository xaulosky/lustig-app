import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Spinner } from "@chakra-ui/react"
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

const Eventos = () => {

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
                name: "Direccion",
                selector: "direccion",
                wrap: true,
                cell: (row) => {
                    return (
                        <>
                            <Tooltip label={row.direccion}>
                                <span style={
                                    {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        maxWidth: "150px",
                                    }
                                }>{row.direccion}</span>
                            </Tooltip>
                        </>
                    )
                }
            },
            {
                name: "Fecha",
                selector: "fecha",
                wrap: true,
                compact: true,
                cell: (row) => {
                    return (
                        <span>{new Date(row.fecha).toLocaleDateString()}</span>
                    )
                }
            },
            {
                name: "Cliente",
                selector: "cliente_nombre",
                cell: (row) => {
                    return (
                        <Tooltip label={row.cliente_nombre + " " + row.cliente_rut}>
                            <span>{row.cliente_nombre}</span>
                        </Tooltip>
                    )
                }
            },
            {
                name: "Tipo",
                selector: "id_tipo_evento",
                compact: true,
                cell: (row) => {
                    return (
                        <Badge>{
                            row.id_tipo_evento === 1 ?
                                "Matrimonio"
                                : row.id_tipo_evento === 2 ?
                                    'Cumpleaños'
                                    : row.id_tipo_evento === 3 ?
                                        "Bautizo" :
                                        row.id_tipo_evento === 4 ?
                                            "Empresarial" :
                                            "Otro"
                        }</Badge>
                    )
                },
                center: true
            },
            {
                name: "Estado",
                selector: "id_estado_evento",
                compact: true,
                center: true,
                cell: (row) => {
                    return (
                        <>

                            <Select bg={
                                row.id_estado_evento === 1 ?
                                    "gray.200"
                                    : row.id_estado_evento === 2 ?
                                        "green.200"
                                        : row.id_estado_evento === 3 ?
                                            "purple.200"
                                            : row.id_estado_evento === 4 ?
                                                "blue.200"
                                                : "red.200"

                            } size="xs" value={row.id_estado_evento} onChange={
                                (e) => {
                                    setIsLoading(true)
                                    apiEventos.updateEvento({
                                        ...row,
                                        id_estado_evento: e.target.value
                                    }).then(() => {
                                        notificaciones.success("Estado actualizado")
                                        getData()
                                    }).finally(() => {
                                        setIsLoading(false)
                                    }
                                    )
                                }
                            }>
                                <option value="1">Pendiente</option>
                                <option value="2">Confirmado</option>
                                <option value="3">En curso</option>
                                <option value="4">Finalizado</option>
                                <option value="5">Cancelado</option>
                            </Select>

                        </>

                    )
                },
            },
            {
                name: "Acciones",
                cell: (row) => {
                    return (
                        <HStack>
                            <EditarEvento row={row} />
                            <Link to={`/evento/${row.id}`} >
                                <GrView className="cursor-pointer text-lg" />
                            </Link>
                            <EliminarEvento id={row.id} actualizar={getData} />
                        </HStack>
                    )
                },
                right: true
            }
        ]
    }, [])

    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEventos().then((res) => {
            setData(res.data)
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
                <Heading size={"sm"} className="p-1" >Agregar Evento</Heading>
                <Card>
                    <CardBody>
                        <AgregarEvento actualizar={getData} />
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
                    <Heading>Eventos</Heading>
                    <Input w="50%" placeholder="Buscar" onChange={
                        (e) => {
                            if (e.target.value.length > 0) {
                                apiEventos.getEventos().then((res) => {
                                    setData(res.data.filter((evento) => {
                                        return evento.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                            || evento.cliente_nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                            || evento.direccion.toLowerCase().includes(e.target.value.toLowerCase())
                                            || evento.cliente_rut.toLowerCase().includes(e.target.value.toLowerCase())

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

export default Eventos