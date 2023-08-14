import {
    Button, ButtonGroup, Flex, GridItem,
    SimpleGrid, SlideFade, Spinner,
} from '@chakra-ui/react'
import useMesas from '../../../hooks/useMesas'
import PropTypes from 'prop-types'
import { useState } from 'react'
import MesaDetalles from './MesaDetalles'
import MesaResumen from './MesaResumen'
import AgregarMesa from './AgregarMesa'

const MesasEvento = ({ id }) => {

    const { mesas, cargandoMesas, actualizarMesas } = useMesas(id)

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
                    <SlideFade in={!cargandoMesas && !mesaAMostar} unmountOnExit exit={false}>
                        <Button colorScheme="blue"
                            onClick={() => setAgregandoMesa(true)}
                        >Agregar Mesa</Button>
                    </SlideFade>
                    <Flex>
                        <SlideFade in={!cargandoMesas && mesaAMostar} unmountOnExit exit={false}>
                            <ButtonGroup>
                                <Button
                                    display={'inline'}
                                    colorScheme="blue"
                                    onClick={() => setMesaAMostar(null)}>
                                    Volver
                                </Button >
                                <Button
                                    display={'inline'}
                                    colorScheme="green"
                                    onClick={() => setMesaAMostar(null)}>
                                    Editar
                                </Button >
                                <Button
                                    justifySelf={'flex-end'}
                                    alignSelf={'end'}
                                    display={'inline'}
                                    colorScheme="red"
                                    onClick={() => setMesaAMostar(null)}>
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
                                    <SimpleGrid mt={5} columns={6} gap={5}>
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
