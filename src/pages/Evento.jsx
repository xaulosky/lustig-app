import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiEventos from "../api/apiEventos"
import { Box, Card, CardBody, CardHeader, Grid, GridItem, Heading } from "@chakra-ui/react"

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from "react-leaflet"

const Evento = () => {
    /* get id from url */
    const { id } = useParams()
    const [cargando, setCargando] = useState(false)
    const [data, setData] = useState([])

    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEvento(id).then((res) => {
            setData(res.data)
            console.log(res.data)
        }).finally(() => {
            setCargando(false)
        }
        )
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>

            <Heading>Evento</Heading>
            <br />
            <Grid templateColumns={"repeat(6,1fr)"} gap={3}>
                <GridItem colSpan={{
                    base: 6,
                    lg: 2
                }} >
                    <Card >
                        <CardBody>
                            <Heading size="md">Datos generales</Heading>
                            <br />
                            <b>Evento:</b> {data.nombre}
                            <br />
                            <b>Fecha:</b> {new Date(data.fecha).toLocaleDateString()}
                            <br />
                            <b>Dirección:</b> {data.direccion}
                            <br />
                            <b>Cliente:</b> {data.cliente_nombre} {data.cliente_apellido}
                            <br />
                            <b>Rut:</b> {/* format rut */} {data.cliente_rut}
                            <br />
                            <b>Presupuesto:</b> {data.presupuesto}
                            <br />
                            <b>Descripción:</b> {data.descripcion}
                            <br />
                            <b>Tipo:</b> {data.tipo_evento}
                            <br />
                            <b>Estado:</b> {data.estado_evento}
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={{
                    base: 6,
                    lg: 4

                }}>
                    <Card>
                        <CardBody>
                            awd
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={{
                    base: 6,
                    lg: 2
                }}>
                    <Card>
                        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    los mayas 1643 los angeles
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Card>
                </GridItem>

            </Grid>
        </>
    )
}

export default Evento