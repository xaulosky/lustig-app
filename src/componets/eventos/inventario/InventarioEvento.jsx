import AgregarObjetos from './AgregrarObjetos'
import { Card, CardBody, GridItem, SimpleGrid } from '@chakra-ui/react'
import ListaObjetos from './ListaObjetos'
import PropTypes from 'prop-types'
import { useState } from 'react'

const InventarioEvento = ({ evento }) => {

    const [actualizar, setActualizar] = useState(1)

    return (
        <>
            <SimpleGrid columns={3} gap={5}>
                <GridItem colSpan={{
                    base: 3,
                    lg: 1
                }}  >
                    <Card>
                        <CardBody>
                            <AgregarObjetos evento={evento} actualizar={
                                () => {
                                    setActualizar(actualizar ? 0 : 1)
                                }
                            } />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={{
                    base: 3,
                    lg: 2
                }}>
                    <ListaObjetos key={actualizar} evento={evento} />
                </GridItem>
            </SimpleGrid>
        </>
    )
}

export default InventarioEvento

InventarioEvento.propTypes = {
    evento: PropTypes.string.isRequired,
}