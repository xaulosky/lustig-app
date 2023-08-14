import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import apiMesas from '../../../api/apiMesas'
import {
    Button, Card, CardBody, CardHeader, Divider, Flex, GridItem, Heading, List, ListItem, Menu, MenuButton,
    MenuItemOption, MenuList, MenuOptionGroup, SimpleGrid, SlideFade, Spinner, Text
} from '@chakra-ui/react'
import { notificaciones } from '../../../helpers/Notificaciones'
import InvitadosMesa from './InvitadosMesa'

const MesaDetalles = ({ mesa }) => {

    const [cargando, setCargando] = useState(false)
    const [data, setData] = useState(null)

    const getMesa = useCallback(() => {
        apiMesas.getMesa(mesa).then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCargando(false)
        })
    }, [mesa])

    useEffect(() => {
        setCargando(true)
        getMesa()
    }, [getMesa])

    console.log(data)

    const updateEstadoMesa = (idEstado) => {
        apiMesas.updateEstadoMesa(data.id, idEstado).then(() => {
            getMesa()
            notificaciones.success('Estado actualizado')
        }).catch(() => {
            notificaciones.error('Error al actualizar estado')
        })
    }

    if (cargando) {
        return (<Card mt={5} h={'100%'} minH={'50svh'} display={'flex '} align={'center'} justify={'center'}>
            <Spinner m={'0 auto'} size={'xl'} thickness='.4rem' colorScheme='gray' />
        </Card>)
    }
    return (
        <Card mt={5} h={'100%'} minH={'50svh'}>
            <SlideFade in={true}>
                <CardHeader>
                    <Flex justify={'space-between'}>

                        <Heading color={'gray.700'} size={'lg'}>{data?.nombre}</Heading>
                        <Flex>
                            {/* <Heading color={'gray.700'} size={'lg'} mr={2}>Estado</Heading> */}
                            <Menu>
                                <MenuButton as={Button} colorScheme='blue'  >
                                    <Heading size={'md'}>{data?.estado.nombre}</Heading>
                                </MenuButton>
                                <MenuList>
                                    <MenuOptionGroup defaultValue={`${data?.id_estado_mesa_evento}`} onChange={
                                        (value) => {
                                            updateEstadoMesa(value)
                                        }
                                    }>
                                        <MenuItemOption value='1'>Vacía</MenuItemOption>
                                        <MenuItemOption value='2'>Montada</MenuItemOption>
                                        <MenuItemOption value='3'>Plato de Entrada</MenuItemOption>
                                        <MenuItemOption value='4'>Plato Principal</MenuItemOption>
                                        <MenuItemOption value='5'>Postre</MenuItemOption>
                                        <MenuItemOption value='6'>Lista</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </CardHeader>
                <Divider />
                <CardBody>
                    <SimpleGrid columns={3}>
                        <GridItem colSpan={1}>
                            <Heading size={'md'} color={'gray.800'} mb={5}>Detalles</Heading>

                            <Text fontWeight={'bold'} color={'gray.500'}>Capacidad Máxima: {data?.cantidad_personas}</Text>
                            <Text fontWeight={'bold'} color={'gray.500'}>Largo: {data?.largo || "-"}</Text>
                            <Text fontWeight={'bold'} color={'gray.500'}>Ancho: {data?.ancho || "-"}</Text>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Heading size={'md'} color={'gray.800'} pl={10} mb={3}>Invitados ({data?.invitados.length})</Heading>
                            <List p={5} pt={0}>
                                {data?.invitados.map((invitado) => (
                                    <ListItem key={invitado.id}>
                                        <InvitadosMesa invitado={invitado} actualizar={getMesa} />
                                        <Divider />
                                    </ListItem>
                                ))}
                            </List>
                        </GridItem>
                    </SimpleGrid>
                </CardBody>

            </SlideFade>
        </Card >
    )
}

export default MesaDetalles

MesaDetalles.propTypes = {
    mesa: PropTypes.object.isRequired
}