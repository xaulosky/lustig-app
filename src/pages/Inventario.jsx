import Tabla from "../componets/Tabla/Tabla"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiInventario from "../api/apiInventario"
import EditarCantidad from "../componets/inventario/acciones/EditarCantidad"
import InputEditable from "../componets/generales/InputEditable"
import { notificaciones } from "../helpers/Notificaciones"
import { AiFillDelete } from "react-icons/ai"
import AgregarObjetoInventario from "../componets/inventario/acciones/AgregarObjeto"
const Inventario = () => {

  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(false)

  const getData = useCallback(() => {
    apiInventario.getInventario().then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setCargando(false)
    })
  }, [])
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
        name: "Descripción",
        selector: row => (
          <InputEditable objeto={row} placeholder={'-'} campo={"descripcion"} callback={async (objeto) => {
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
        name: "Acciones",
        selector: row => (
          <Flex alignItems="center" pr={2}>
            {/* <EditarObjetoInventario objetoInventario={row} /> */}
            <AiFillDelete onClick={async () => {
              const confirmacion = await notificaciones.confirmacion("¿Está seguro que desea eliminar este objeto del inventario?")
              if (!confirmacion) return
              apiInventario.deleteObjetoInventario(row.id).then(() => {
                notificaciones.success("Eliminado")
                getData()
              }).catch((err) => {
                notificaciones.error(err.data?.message || "Error al eliminar")
              })
            }} className="ml-2 text-gray-500 cursor-pointer hover:text-red-600" size={28} />

          </Flex>
        ),
        right: true,
      },
      {
        width: '0px',
      }
    ]
  }, [getData])

  useEffect(() => {
    setCargando(true)
    getData()
  }, [getData])

  return (
    <Box  >
      <Flex justifyContent="space-between" alignItems="center" direction={'row'}>
        <Heading>Inventario</Heading>
        <AgregarObjetoInventario actualizar={getData} />
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