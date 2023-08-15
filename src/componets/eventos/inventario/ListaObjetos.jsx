import PropTypes from 'prop-types'
import useInsumosEvento from '../../../hooks/useInsumosEvento'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Tabla from '../../Tabla/Tabla'
import { notificaciones } from '../../../helpers/Notificaciones'

const ListaObjetos = ({ evento }) => {

    const { insumos, cargando, deleteInsumoEvento, updateInsumoEvento } = useInsumosEvento(evento)

    const columas = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad_a_usar,
            sortable: true,
        },
        {
            name: 'Unidad de medida',
            selector: row => row.unidad_medida || row.cantidad_a_usar === 1 ? 'Unidad' : 'Unidades',
            sortable: true,

        },
        {
            name: 'Detalles',
            selector: row => row.descripcion,
            sortable: true,

        },
        {
            name: 'Acciones',
            center: "true",
            width: '10rem',
            selector: row => (
                <ButtonGroup p={3}>
                    <IconButton isRound colorScheme='blue' icon={<AiFillEdit size={'1.4rem'} />}
                        onClick={() => {
                            updateInsumoEvento(row)
                        }}
                    />
                    <IconButton isRound colorScheme='red' icon={<AiFillDelete size={'1.4rem'} />}
                        onClick={async () => {
                            if (!await notificaciones.confirmacion('¿Quitar del evento?')) return
                            deleteInsumoEvento(row.id)
                        }}
                    />
                </ButtonGroup>
            ),
        }
    ]
    return (
        <>
            <Tabla
                columnas={columas}
                data={insumos}
                cargando={cargando}
            />

        </>
    )
}

export default ListaObjetos

ListaObjetos.propTypes = {
    evento: PropTypes.string.isRequired,
}