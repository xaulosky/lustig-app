import {
    Editable,
    EditableInput,
    EditablePreview,
    Spinner,
} from '@chakra-ui/react'
import apiInventario from '../../../api/apiInventario'
import { notificaciones } from '../../../helpers/Notificaciones'
import PropTypes from 'prop-types'
import { useState } from 'react'

const EditarCantidad = ({ objetoInventario }) => {

    const [editando, setEditando] = useState(false)
    const [key, setKey] = useState(0)

    const editar = async (value) => {
        value = parseFloat(value)
        if ((!value && value !== 0) || value === objetoInventario.cantidad) {
            setKey(key ? 0 : 1)
            return
        }
        setEditando(true)
        apiInventario.updateObjetoInventario({ ...objetoInventario, cantidad: value })
            .then(() => {
                notificaciones.success("Editado")
            }).catch((err) => {
                notificaciones.error(err.data?.message || "Error al editar cantidad")
                setKey(key ? 0 : 1)
            }).finally(() => {
                setEditando(false)
            })
    }
    return (
        <Editable key={key} defaultValue={objetoInventario.cantidad}
            onSubmit={editar}
            isDisabled={editando}
            height={'100%'}
            p={1}
            fontSize={'sm'}
            fontWeight={'bold'}

        >
            <EditablePreview width={'100px'} />
            {editando && <Spinner size={'xs'} />}
            <EditableInput type='number' pl={2} />
        </Editable>
    )
}

export default EditarCantidad

EditarCantidad.propTypes = {
    objetoInventario: PropTypes.object.isRequired
}