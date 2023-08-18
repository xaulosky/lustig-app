import Tabla from "../componets/Tabla/Tabla"
import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Input } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import apiInventario from "../api/apiInventario"
import InputEditable from "../componets/generales/InputEditable"
import { notificaciones } from "../helpers/Notificaciones"
import { AiFillDelete } from "react-icons/ai"
import AgregarObjetoInventario from "../componets/inventario/acciones/AgregarObjeto"
import AgregarObjeto from "../componets/inventario/acciones/AgregarObjeto"
import EliminarObjeto from "../componets/inventario/acciones/EliminarObjeto"
import EditarObjeto from "../componets/inventario/acciones/EditarObjeto"
const Inventario = () => {

  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(false)
  const [tipos, setTipos] = useState([])

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
  const obtenerTipos = () => {
    /* obtener tipos desde data sin repetir */
    let tipos = []
    data.forEach((inventario) => {
      if (!tipos.includes(inventario.tipo)) {
        tipos.push(inventario.tipo)
      }
    })
    setTipos(tipos)
  }

  const columns = useMemo(() => {
    return [
      {
        name: "Nombre",
        selector: row => row.nombre,
        width: '200px',
        sortable: true,
      },
      {
        name: "Cantidad",
        selector: row => row.cantidad
      },
      {
        name: "Categoría",
        selector: row => row.tipo
      },
      {
        name: "Descripción",
        selector: row => row.descripcion
      },
      {
        name: "Acciones",
        selector: row => <Flex>
          <EditarObjeto row={row} actualizar={getData} tipos={tipos} />
          <EliminarObjeto id={row.id} actualizar={getData} />
        </Flex>,
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

  useEffect(() => {
    obtenerTipos()
  }, [data])

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
            <AgregarObjeto actualizar={getData} tipos={tipos} />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={
        {
          base: 6,
          md: 6,
          lg: 4,
        }
      }
        style={
          {
            gap: "1px"
          }
        }
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>Inventario</Heading>
          <Input w="50%" placeholder="Buscar" onChange={
            (e) => {
              if (e.target.value.length > 0) {
                apiInventario.getInventario().then((res) => {
                  setData(res.data.filter((objeto) => {
                    return objeto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                      || objeto.tipo.toLowerCase().includes(e.target.value.toLowerCase())
                  }))
                  if (res.data.length === 0) {
                    notificaciones.error("No hay eventos")
                  }
                }).finally(() => {
                  setCargando(false)
                })
              }
            }
          } />
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