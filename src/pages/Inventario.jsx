import Tabla from "../componets/Tabla/Tabla"
import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Input } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiInventario from "../api/apiInventario"
import EditarCantidad from "../componets/inventario/acciones/EditarCantidad"
import InputEditable from "../componets/generales/InputEditable"
import { notificaciones } from "../helpers/Notificaciones"
import { AiFillDelete } from "react-icons/ai"
import AgregarObjetoInventario from "../componets/inventario/acciones/AgregarObjeto"
import AgregarObjeto from "../componets/inventario/acciones/AgregarObjeto"
import EliminarObjeto from "../componets/inventario/acciones/EliminarObjeto"
const Inventario = () => {

  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(false)

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
  /* column name, selector */
  const columns = useMemo(() => {
    return [
      {
        name: "Nombre",
        selector: row => row.nombre
      },
      {
        name: "Cantidad",
        selector: row => row.cantidad
      },
      {
        name: "Categoría",
        selector: row => row.categoria
      },
      {
        name: "Descripción",
        selector: row => row.descripcion
      },
      {
        name: "Acciones",
        selector: row => <EliminarObjeto id={row.id} actualizar={getData} />,
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

    <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
      <GridItem colSpan={
        {
          base: 6,
          md: 6,
          lg: 2,

        }
      }>
        <Heading size="sm" className="p-1" >Agregar Objeto</Heading>
        <Card>
          <CardBody>
            <AgregarObjeto actualizar={getData} />
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
          <Heading>Inventario</Heading>
          <Input w="50%" placeholder="Buscar" onChange={
            (e) => {
              if (e.target.value.length > 0) {
                apiInventario.getInventario().then((res) => {
                   setData(res.data.filter((inventario) => {
                     return inventario.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                   }))
                   if (res.data.length === 0) {
                     notificaciones.error("No hay servicios")
                   }
                }
                )
              }
            }
          }  />
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

export default Inventario