import Tabla from "../componets/Tabla/Tabla"
import { BiSolidEdit } from "react-icons/bi"
import { Box, Button, Flex, HStack, Heading } from "@chakra-ui/react"
import apiEventos from "../api/apiEventos"
import { useCallback, useEffect, useMemo, useState } from "react"
import AgregarEvento from "../componets/eventos/AgregarEvento"
import EditarEvento from "../componets/eventos/EditarEvento"
import { GrView } from "react-icons/gr"
import { AiFillDelete } from "react-icons/ai"
import { Link } from "react-router-dom"
import EliminarEvento from "../componets/eventos/EliminarEvento"
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
                selector: "fecha",
                wrap: true,
                cell: (row) => {
                    return (
                        <span>{new Date(row.fecha).toLocaleDateString()}</span>
                    )
                }
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
                name: "Tipo",
                selector: "id_tipo_evento",
                compact: true
            },
            {
                name: "Estado",
                selector: "id_estado_evento",
                compact: true
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
                            <EliminarEvento />
                        </HStack>
                    )
                },
                compact: true
            }

        ]
    }, [])


    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEventos().then((res) => {
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