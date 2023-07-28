import Tabla from "../componets/Tabla/Tabla"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiInventario from "../api/apiInventario"
import EditarObjetoInventario from "../componets/inventario/acciones/EditarObjeto"
import EditarCantidad from "../componets/inventario/acciones/EditarCantidad"
import InputEditable from "../componets/generales/InputEditable"
import { notificaciones } from "../helpers/Notificaciones"
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
          <EditarCantidad objetoInventario={row} />
        )
      },
      {
        name: "Descripción",
        selector: row => (
          <InputEditable objeto={row} campo={"descripcion"} callback={async (objeto) => {
            await apiInventario.updateObjetoInventario(objeto).then(() => {
              notificaciones.success("Descripción editada")
              getData()
            }).catch((err) => {
              notificaciones.error(err.data?.message || "Error al editar descripción")
            })
          }} />
        )
      },
      {
        name: "Categoría",
        selector: row => (
          <InputEditable objeto={row} campo={"tipo"} placeholder={'-'} callback={async (objeto) => {
            await apiInventario.updateObjetoInventario(objeto).then(() => {
              notificaciones.success("Categoría editada")
              getData()
            }).catch((err) => {
              notificaciones.error(err.data?.message || "Error al editar categoría")
            })
          }} />
        )
      },
      {
        name: "Acciones",
        selector: row => (
          <Flex alignItems="center">
            <EditarObjetoInventario objetoInventario={row} />
          </Flex>
        )
      }
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