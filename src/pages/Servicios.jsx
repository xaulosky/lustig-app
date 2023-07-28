import Tabla from "../componets/Tabla/Tabla"
import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Spinner } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { GrView } from "react-icons/gr"
import { Link } from "react-router-dom"
import { notificaciones } from "../helpers/Notificaciones"
import { BiDownArrow } from "react-icons/bi"
import { Tooltip } from '@chakra-ui/react'
import { set } from "react-hook-form"
import apiServicios from "../api/apiServicios"
import AgregarServicio from "../componets/dashboard/servicios/AgregarServicio"

const Servicios = () => {

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
                name: "Descripcion",
                selector: "descropcion",
            }
        ]
    }, [])

    const getData = useCallback(() => {

        apiServicios.getServicios().then((res) => {
            setData(res.data)
            console.log(res.data)
            if (res.data.length === 0) {
                notificaciones.error("No hay servicios")
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
                <Heading>Agregar Servicio</Heading>
                <br />
                <Card>
                    <CardBody>
                        {/*  <AgregarServicio actualizar={getData} /> */}
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
                    <Heading>Servicios</Heading>
                    <Input w="50%" placeholder="Buscar" />
                </Flex>
                <br />
                <Card>
                    <Tabla
                        data={data}
                        columnas={columns}
                        titulo={"Servicios"}
                    />
                </Card>
            </GridItem>
        </Grid>
    )
}

export default Servicios