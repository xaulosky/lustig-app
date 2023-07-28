import Tabla from "../componets/Tabla/Tabla"
import { Box, Flex, Heading, Select } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiPersonal from "../api/apiPersonal"
import InputEditable from "../componets/generales/InputEditable"
import { notificaciones } from "../helpers/Notificaciones"

const Personal = () => {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)
    const [areas, setAreas] = useState([])
    const [cargandoAreas, setCargandoAreas] = useState(false)

    const editar = async (data) => {
        await apiPersonal.updatePersonal(data).then(() => {
            notificaciones.success("Editado correctamente")
            getData()
        }).catch((err) => {
            console.log(err)
            notificaciones.error("Error al editar")
        })
    }

    /* column name, selector */
    const columns = useMemo(() => {
        return [
            {
                name: "Nombre",
                selector: row => (
                    <InputEditable objeto={row} placeholder={'-'} campo={"nombre"} callback={editar} />
                )
            },
            {
                name: "Apellido",
                selector: row => (
                    <InputEditable objeto={row} placeholder={'-'} campo={"apellido"} callback={editar} />
                )
            },
            {
                name: "Rut",
                selector: row => row.rut || "-"
            },
            {
                name: "Teléfono",
                selector: row => (
                    <InputEditable objeto={row} placeholder={'-'} campo={"telefono"} callback={editar} />
                )
            },
            {
                name: "Dirección",
                selector: row => (
                    <InputEditable objeto={row} placeholder={'-'} campo={"direccion"} callback={editar} />
                )
            },
            {
                name: "Área",
                selector: row => (
                    <Select
                        onChange={(e) => {
                            editar({ ...row, id_area: e.target.value })
                        }}
                        defaultValue={row.id_area}  >
                        {areas.map((area) => {
                            return <option key={area.id} value={area.id}>{area.nombre}</option>
                        })}
                    </Select>
                )
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areas, data])


    const getData = useCallback(async () => {
        apiPersonal.getAreas().then((res) => {
            setAreas(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCargandoAreas(false)
        })
        apiPersonal.getPersonal().then(async (res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCargando(false)
        })
    }, [])

    useEffect(() => {
        setCargando(true)
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
                cargando={cargando && cargandoAreas}
            />
        </Box>
    )
}

export default Personal