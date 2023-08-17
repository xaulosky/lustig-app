import React from 'react'
import useGastos from '../../../hooks/useGastos'
import Tabla from '../../Tabla/Tabla'
import { ButtonGroup, Card, CardBody, GridItem, IconButton, SimpleGrid } from '@chakra-ui/react'
import AgregarGasto from './AgregarGasto'
import PropTypes from 'prop-types'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { notificaciones } from '../../../helpers/Notificaciones'
import EditarGasto from './EditarGasto'

const ListaDeGastos = ({ evento }) => {

    const { gastos, deleteGasto, updateGasto, getGastos } = useGastos(evento)

    const columnas = [
        {
            name: 'Gasto',
            selector: row => row.nombre,
        },
        {
            name: 'Monto',
            selector: row => '$' + row.monto?.toLocaleString('de-DE')
        },
        {
            name: 'Fecha',
            selector: row => `${row?.fecha.split('-')[2].slice(0, 2)}-${row?.fecha.split('-')[1]}-${row?.fecha.split('-')[0]} ${row?.fecha.split(' ')[1]}`,
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
                    <EditarGasto gasto={row} evento={evento} actualizar={getGastos} />
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
        <SimpleGrid columns={{
            base: 1,
            md: 3

        }} gap={5}>

            <GridItem colSpan={1}>
                <Card>
                    <CardBody>
                        <AgregarGasto evento={evento} actualizar={getGastos} />
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