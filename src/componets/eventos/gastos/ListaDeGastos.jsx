import React from 'react'
import useGastos from '../../../hooks/useGastos'
import Tabla from '../../Tabla/Tabla'
import { ButtonGroup, Card, CardBody, GridItem, IconButton, SimpleGrid } from '@chakra-ui/react'
import AgregarGasto from './AgregarGasto'
import PropTypes from 'prop-types'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { notificaciones } from '../../../helpers/Notificaciones'

const ListaDeGastos = ({ evento }) => {

    const { gastos, deleteGasto, updateGasto } = useGastos(evento)

    const columnas = [
        {
            name: 'Gasto',
            selector: row => row.nombre,
        },
        {
            name: 'Monto',
            selector: row => row.monto,
        },
        {
            name: 'Fecha',
            selector: row => row?.fecha,
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion,
        },
        {
            name: 'Acciones',
            center: "true",
            width: '10rem',
            selector: row => (
                <ButtonGroup p={3}>
                    <IconButton isRound colorScheme='blue' icon={<AiFillEdit size={'1.4rem'} />}
                        onClick={() => {
                            // setEdicion(row)
                            // setAgregando(true)
                        }}
                    />
                    <IconButton isRound colorScheme='red' icon={<AiFillDelete size={'1.4rem'} />}
                        onClick={async () => {
                            if (!await notificaciones.confirmacion('¿Quitar de la lista?')) return
                            deleteGasto(row.id)
                        }}
                    />
                </ButtonGroup>
            ),
        }

    ]

    return (
        <SimpleGrid columns={3} gap={5}>

            <GridItem colSpan={1}>
                <Card>
                    <CardBody>
                        <AgregarGasto evento={evento} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem colSpan={2}>
                <Tabla
                    data={gastos}
                    columnas={columnas}
                />
            </GridItem>
        </SimpleGrid>
    )
}

export default ListaDeGastos

ListaDeGastos.propTypes = {
    evento: PropTypes.string.isRequired
}