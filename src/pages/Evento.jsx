import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiEventos from "../api/apiEventos"
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading } from "@chakra-ui/react"

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Circle, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import axios from "axios"
import EditarCronograma from "../componets/eventos/EditarCronograma"

import 'react-quill/dist/quill.snow.css';


const Evento = () => {
    /* get id from url */
    const [editarCronograma, setEditarCronograma] = useState(false)
    const { id } = useParams()
    const [cargando, setCargando] = useState(false)
    const [data, setData] = useState([])
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

    const [cronograma, setCronograma] = useState('')

    const rutaMap = 'https://geocode.maps.co/search?q='
    /* example https://geocode.maps.co/search?q=los%20angeles%20chile */
    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEvento(id).then((res) => {
            setData(res.data)
            console.log(res.data)
            axios.get(rutaMap + res.data.direccion).then((res) => {
                console.log(res);
                setLat(res.data[0]?.lat)
                setLon(res.data[0]?.lon)
            })
        }).finally(() => {
            setCargando(false)
        }
        )
    }, [])


    useEffect(() => {
        apiEventos.getCronograma(id).then((res) => {
            setCronograma(res.data.cronograma)
        })
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
                            <Flex justifyContent="space-between" alignItems="center">
                                <Heading size="md">Cronograma</Heading>
                                <Button size="sm" onClick={() => { setEditarCronograma(!editarCronograma) }} > Modificar Cronograma</Button>
                            </Flex>
                            <br />
                            {
                                editarCronograma ? <EditarCronograma id={id} cronograma={cronograma} setCronograma={setCronograma} setEditarCronograma={setEditarCronograma} /> : <div dangerouslySetInnerHTML={{ __html: cronograma }} />
                            }
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={{
                    base: 6,
                    lg: 2
                }}>
                    <Card >
                        {
                            lat && lon ?
                                <MapContainer center={[lat, lon]} zoom={15} scrollWheelZoom={false} style={{
                                    height: "300px",
                                }}  >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Circle center={[lat, lon]} radius={50}>
                                        <Popup>
                                            {
                                                data.direccion
                                            }
                                        </Popup>
                                    </Circle>
                                </MapContainer> : null
                        }
                    </Card>
                </GridItem>

            </Grid>
        </>
    )
}

export default Evento