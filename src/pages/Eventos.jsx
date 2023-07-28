import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
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

const Eventos = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: "nombre"
            },
            {
                name: "Direccion",
                selector: "direccion",
                wrap: true
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
                selector: "cliente_nombre"
            },
            {
                /*  <option selected value="1">Matrimonio</option>
                                        <option value="2">Cumpleaños</option>
                                        <option value="3">Bautizo</option>
                                        <option value="4">Empresarial</option>
                                        <option value="5">Otro</option> */
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
                            {
                                row.id_estado_evento === 1 ?
                                    <Badge>pendiente</Badge>
                                    : row.id_estado_evento === 2 ?
                                        <Badge colorScheme="green" >Confirmado</Badge>
                                        : row.id_estado_evento === 3 ?
                                            <Badge colorScheme="purple" >En curso</Badge>
                                            : row.id_estado_evento === 3 ?
                                                <Badge colorScheme="purple" >Finalizado</Badge> :
                                                <Badge colorScheme="red" >Cancelado</Badge>

                            }
                            <Menu>
                                <MenuButton as={Button} rightIcon={<BiDownArrow />}>
                                    Actions
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Download</MenuItem>
                                    <MenuItem>Create a Copy</MenuItem>
                                    <MenuItem>Mark as Draft</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                    <MenuItem>Attend a Workshop</MenuItem>
                                </MenuList>
                            </Menu>
                        </>

                    )
                },
            },
            {
                name: "Acciones",
                cell: (row) => {
                    return (
                        <HStack>
                            <EditarEvento />
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
                <Heading>Agregar Evento</Heading>
                <br />
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
                    <Input w="50%" placeholder="Buscar" />
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