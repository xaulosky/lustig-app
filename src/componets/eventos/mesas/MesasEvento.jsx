import {
    Button, ButtonGroup, Card, CardBody, Flex, GridItem,
    SimpleGrid, SlideFade, Spinner,
} from '@chakra-ui/react'
import useMesas from '../../../hooks/useMesas'
import PropTypes from 'prop-types'
import { useState } from 'react'
import MesaDetalles from './MesaDetalles'
import MesaResumen from './MesaResumen'
import AgregarMesa from './AgregarMesa'
import { notificaciones } from '../../../helpers/Notificaciones'

const MesasEvento = ({ id }) => {

    const { mesas, cargandoMesas, actualizarMesas, eliminarMesa } = useMesas(id)

    const [mesaAMostar, setMesaAMostar] = useState(null)
    const [agregandoMesa, setAgregandoMesa] = useState(false)

    return (

        <>
            {
                agregandoMesa &&
                <>
                    <SlideFade in={true} unmountOnExit exit={false}>
                        <Button colorScheme="blue"
                            onClick={() => setAgregandoMesa(false)}
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
                                    colorScheme="blue"
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
                                    <SimpleGrid columns={4} gap={5}>
                                        <GridItem colSpan={1}>
                                            <Card>
                                                <CardBody>
                                                    <AgregarMesa evento={id} volver={() => {
                                                        actualizarMesas()
                                                        setAgregandoMesa(false)
                                                    }} />
                                                </CardBody>
                                            </Card>
                                        </GridItem>

                                        <GridItem colSpan={3}>
                                            <SimpleGrid columns={5} gap={3}>
                                                {cargandoMesas ? <Spinner /> : mesas.map((mesa) => (
                                                    <GridItem key={mesa.id}>
                                                        <MesaResumen
                                                            mesa={mesa}
                                                            actualizar={actualizarMesas}
                                                            onClick={setMesaAMostar}
                                                        />
                                                    </GridItem>
                                                ))}
                                            </SimpleGrid>
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
