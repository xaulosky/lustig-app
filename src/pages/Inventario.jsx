import Tabla from "../componets/Tabla/Tabla"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiInventario from "../api/apiInventario"
const Inventario = () => {

  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(false)

  /* column name, selector */
  const columns = useMemo(() => {
    return [
      {
        name: "Nombre",
        selector: row => (<Flex alignItems="center" fontSize={'large'}>
          <h1 className="ml-2 text-gray-500">{row.nombre}</h1>
        </Flex>)
      },
      {
        name: "Cantidad",
        selector: row => (
          <Flex alignItems="center">
            <Button>
              <span>{row.cantidad}</span>
              <span className="ml-2 text-gray-500">{row.unidad_medida || "Unidades"}</span>
            </Button>
          </Flex>
        )
      },

    ]
  }, [])


  const getData = useCallback(() => {
    setCargando(true)
    apiInventario.getInventario().then((res) => {
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
        <Heading>Inventario</Heading>
        {/* <AgregarEvento /> */}

      </Flex>
      <br />
      <Tabla
        data={data}
        columnas={columns}
        titulo={"Inventario"}
        cargando={cargando}
      />
    </Box>
  )
}

export default Inventario