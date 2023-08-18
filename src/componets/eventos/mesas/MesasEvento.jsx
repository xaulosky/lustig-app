import {
    Badge,
    Button, ButtonGroup, Card, CardBody, Flex, GridItem,
    Select,
    SimpleGrid, SlideFade, Spinner, Stack, Switch, Tooltip,
} from '@chakra-ui/react'
import useMesas from '../../../hooks/useMesas'
import PropTypes from 'prop-types'
import { useState } from 'react'
import MesaDetalles from './MesaDetalles'
import MesaResumen from './MesaResumen'
import AgregarMesa from './AgregarMesa'
import { notificaciones } from '../../../helpers/Notificaciones'
import { AiFillDelete, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import Tabla from '../../Tabla/Tabla'
import { GrView } from 'react-icons/gr'
import apiMesas from '../../../api/apiMesas'

const MesasEvento = ({ id }) => {

    const [vistaGrid, setVistaGrid] = useState(false)

    const { mesas, cargandoMesas, actualizarMesas, eliminarMesa } = useMesas(id)
    const [mesaAMostar, setMesaAMostar] = useState(null)
    const [agregandoMesa, setAgregandoMesa] = useState(false)

    console.log(mesas);


    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre
        },
        {
            name: 'Estado',
            cell: row => {
                return (
                    <>
                        <Select bg={
                            row.estado.id === 1 ?
                                "red.200"
                                : row.estado.id === 2 ?
                                    "gray.200"
                                    : row.estado.id === 3 ?
                                        "purple.200"
                                        : row.estado.id === 4 ?
                                            "blue.200"
                                            : row.estado.id === 5 ?
                                                "yellow.200"
                                                : row.estado.id === 6 ?
                                                    "green.200"
                                                    : "red.200"



                        } size="xs" value={row.estado.id} onChange={
                            (e) => {
                                const idEstado = parseInt(e.target.value)
                                apiMesas.updateEstadoMesa(row.id, idEstado).then((res) => {
                                    console.log(res)
                                    actualizarMesas()
                                    notificaciones.success('Estado actualizado')
                                }).catch(() => {
                                    notificaciones.error('Error al actualizar estado')
                                })
                            }
                        }>
                            <option value="1">Vacía</option>
                            <option value="2">Montada</option>
                            <option value="3">Plato de Entrada</option>
                            <option value="4">Plato Principal</option>
                            <option value="5">Postre</option>
                            <option value="6">Lista</option>
                        </Select>

                    </>

                )
            }
        },
        {
            name: 'Personas',
            center: true,
            cell: row => {
                return (
                    <>
                        {
                            row.invitados.length > 0 ?
                                <Badge colorScheme='blue'>{row.invitados.length + "/" + row.cantidad_personas}</Badge>
                                :
                                <Badge colorScheme='red'>0</Badge>
                        }
                    </>
                )
            }
        },
        {
            name: 'Tipo',
            selector: row => {
                if (row.largo === 1 && row.ancho === 1) return 'Cuadrada'
                if (row.largo === 2 && row.ancho === 1) return 'Rectangular'
                if (row.ancho === null) return 'Redonda'
            }
        },
        {
            name: 'Detalle',
            selector: row => {

                /* ver si algun invitado tiene detalle poner si sino tiene no */
                if (row.invitados.length > 0) {
                    /* row.invitados.forEach(invitado => {
                        if (invitado.detalles) return 'Con detalle'
                    }); */
                    let detalles = []
                    for (let i = 0; i < row.invitados.length; i++) {
                        if (row.invitados[i].detalles) {
                            detalles.push(row.invitados[i].detalles)
                        }
                    }
                    return <Tooltip label={detalles.join(', ')} aria-label="A tooltip">
                        <Badge bg="red.200">Con detalle</Badge>
                    </Tooltip>
                } else {
                    return <Badge>Sin detalle</Badge>
                }

            },
            center: true
        },

        {
            name: 'Acciones',
            cell: (row) => <Stack direction={"row"}>
                <GrView className='cursor-pointer  text-lg' onClick={() => setMesaAMostar(row)} color="gray" />
                <AiFillDelete
                    className='cursor-pointer  text-lg'
                    colorScheme="red"
                    onClick={async () => {
                        if (!await notificaciones.confirmacion('¿Eliminar mesa?')) return
                        eliminarMesa(row.id)
                    }}
                />
            </Stack>
        }
    ]

    return (

        <>
            {
                agregandoMesa &&
                <>
                    <SlideFade in={true} unmountOnExit exit={false}>
                        <Button colorScheme="blue"
                            onClick={() => { setAgregandoMesa(false); actualizarMesas(); setAgregandoMesa(false); }}

                        >Volver</Button>
                    </SlideFade>
                    <SlideFade in={true} unmountOnExit>
                        <AgregarMesa evento={id} volver={() => {
                            actualizarMesas()
                            setAgregandoMesa(false)
                        }} />
                    </SlideFade>
                </>
            }
            {!agregandoMesa &&
                <>

                    <Flex>
                        <SlideFade in={!cargandoMesas && mesaAMostar} unmountOnExit exit={false}>
                            <ButtonGroup>
                                <Button
                                    display={'inline'}
                                    onClick={() => setMesaAMostar(null)}>
                                    Volver
                                </Button >
                                {/* <Button
                                    display={'inline'}
                                    colorScheme="green"
                                    onClick={() => setMesaAMostar(null)}>
                                    Editar
                                </Button > */}
                                <Button
                                    justifySelf={'flex-end'}
                                    alignSelf={'end'}
                                    display={'inline'}
                                    colorScheme="red"
                                    onClick={async () => {
                                        if (!await notificaciones.confirmacion('¿Eliminar mesa?')) return
                                        eliminarMesa(mesaAMostar.id, () => { setMesaAMostar(null) })
                                    }}>
                                    Eliminar
                                </Button >
                            </ButtonGroup>
                        </SlideFade>
                    </Flex>
                    <>
                        {
                            mesaAMostar ?
                                <SlideFade in={!cargandoMesas && mesaAMostar} unmountOnExit>
                                    <MesaDetalles mesa={mesaAMostar.id} />
                                </SlideFade >
                                :
                                <SlideFade in={!cargandoMesas}>
                                    <SimpleGrid columns={{
                                        base: 1,
                                        md: 12,
                                    }} gap={5}>
                                        <GridItem colSpan={{
                                            base: 1,
                                            md: 3,
                                        }}>
                                            <Card>
                                                <CardBody>
                                                    <AgregarMesa evento={id} volver={() => {
                                                        actualizarMesas()
                                                        setAgregandoMesa(false)
                                                    }} />
                                                </CardBody>
                                            </Card>
                                        </GridItem>

                                        <GridItem colSpan={{
                                            base: 1,
                                            md: 9,
                                        }}>
                                            {/* <Flex justifyContent={"end"}>
                                                <Button>
                                                    <AiOutlineUnorderedList size={'1.4rem'} />
                                                    <Switch size='sm' onChange={() => {
                                                        setVistaGrid(!vistaGrid)
                                                    }} />
                                                    <BsFillGrid3X3GapFill size={'1.4rem'} />
                                                </Button>
                                            </Flex> */}
                                            {/* {
                                                vistaGrid ?
                                                    <SimpleGrid columns={{
                                                        base: 1,
                                                        sm: 2,
                                                        md: 3,
                                                        lg: 4,
                                                    }} gap={3}>
                                                        {
                                                            cargandoMesas
                                                                ?
                                                                <Spinner />
                                                                :
                                                                mesas.map((mesa) => (
                                                                    <GridItem key={mesa.id}>
                                                                        <MesaResumen
                                                                            mesa={mesa}
                                                                            actualizar={actualizarMesas}
                                                                            onClick={setMesaAMostar}
                                                                        />
                                                                    </GridItem>
                                                                ))
                                                        }
                                                    </SimpleGrid>
                                                    : 
                                            } */}
                                            <Card>
                                                        <Tabla
                                                            data={mesas}
                                                            columnas={columns}
                                                            titulo={"Eventos"}
                                                        />
                                                    </Card>
                                        </GridItem>
                                    </SimpleGrid>
                                </SlideFade>
                        }
                    </>
                </>}
        </ >
    )
}

export default MesasEvento

MesasEvento.propTypes = {
    id: PropTypes.string.isRequired
}
