import Tabla from "../componets/Tabla/Tabla"
import { BiSolidEdit } from "react-icons/bi"
import { Box, Flex, HStack, Heading } from "@chakra-ui/react"
import apiEventos from "../api/apiEventos"
import { useCallback, useEffect, useMemo, useState } from "react"
import AgregarEvento from "../componets/eventos/AgregarEvento"
const Eventos = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)
    apiEventos.getEventos().then((res) => {
        console.log(res)
    })

    /* column name, selector */
    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: "nombre"
            },
            {
                name: "Descripcion",
                selector: "descripcion"
            },
            {
                name: "Direccion",
                selector: "direccion"
            },
            {
                name: "Fecha",
                selector: "fecha"
            },
            {
                name: "Estado",
                selector: "estado"
            },
            {
                name: "Presupuesto",
                selector: "presupuesto"
            },
            {
                name: "Cliente",
                selector: "id_cliente"
            },
            {
                name: "Tipo Evento",
                selector: "id_tipo_evento"
            },
            {
                name: "Estado Evento",
                selector: "id_estado_evento"
            }
        ]
    }, [])


    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEventos().then((res) => {
            setData(res.data)
        }).finally(() => {
            setCargando(false)
        }
        )
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Box  >
            <Flex justifyContent="space-between" alignItems="center">
                <Heading>Eventos</Heading>
                <AgregarEvento actualizar={getData} />

            </Flex>
            <br />
            <Tabla
                data={data}
                columnas={columns}
                titulo={"Eventos"}
            />
        </Box>
    )
}

export default Eventos