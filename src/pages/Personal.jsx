import Tabla from "../componets/Tabla/Tabla"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiPersonal from "../api/apiPersonal"
const Personal = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    /* column name, selector */
    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: row => row.nombre + " " + (row.apellido || "")
            },
            {
                name: "Rut",
                selector: row => row.rut || "-"
            },
            {
                name: "Teléfono",
                selector: row => row.telefono || "-"
            },
            {
                name: "Dirección",
                selector: row => row.direccion || "-"
            },
            {
                name: "Área",
                selector: row => row.area?.nombre || "-"
            },
        ]
    }, [])


    const getData = useCallback(() => {
        setCargando(true)
        apiPersonal.getPersonal().then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCargando(false)
        })

    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Box  >
            <Flex justifyContent="space-between" alignItems="center">
                <Heading>Personal</Heading>
                {/* <AgregarEvento /> */}

            </Flex>
            <br />
            <Tabla
                data={data}
                columnas={columns}
                titulo={"Personal"}
                cargando={cargando}
            />
        </Box>
    )
}

export default Personal