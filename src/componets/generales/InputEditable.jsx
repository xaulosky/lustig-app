import {
    Editable,
    EditableInput,
    EditablePreview,
    Spinner,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Swal from 'sweetalert2'

const InputEditable = ({ objeto, campo, formato, validacion, callback, numerico, bold, placeholder, nullable }) => {

    // El Callback debe ser una función async
    // El formato debe ser una función que recibe el valor y retorna el valor formateado
    // El validacion debe ser una función que recibe el valor y retorna true si es válido o false si no lo es y recibe el valor nuevo

    const [editando, setEditando] = useState(false)
    const [key, setKey] = useState(0)
    const [borde, setBorde] = useState('none')

    const editar = async (value) => {
        if (formato) {
            value = formato(value)
        }
        if (objeto[campo] === value) {
            setKey(key ? 0 : 1)
            return
        }
        if ((validacion && validacion(value) || (!nullable && !value && value !== 0))) {
            setKey(key ? 0 : 1)
            setBorde('1px solid red')
            setTimeout(() => {
                setBorde('none')
            }, 1000)
            return
        }
        setEditando(true)
        const { isConfirmed } = await Swal.fire({
            title: '¿Está seguro?',
            text: "Se editará el campo",
            showCancelButton: true,
            confirmButtonColor: '#161616',
            cancelButtonColor: '#d33'
        })
        if (isConfirmed) {
            await callback({ ...objeto, [campo]: value })
        }
        setKey(key ? 0 : 1)
        setEditando(false)
    }
    return (
        <Editable key={key} defaultValue={objeto[campo]} placeholder={placeholder}
            onBlur={() => setBorde('none')}
            onSubmit={editar}
            isDisabled={editando}
            height={'100%'}
            p={1}
            fontSize={'sm'}
            fontWeight={bold ? 'bold' : 'normal'}
        >
            <EditablePreview px={2} border={borde} />
            {editando && <Spinner size={'xs'} />}
            <EditableInput type={numerico ? 'number' : 'text'} pl={2} />
        </Editable>
    )
}

export default InputEditable

InputEditable.propTypes = {
    objeto: PropTypes.object.isRequired,
    campo: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    formato: PropTypes.func,
    validacion: PropTypes.func,
    numerico: PropTypes.bool,
    bold: PropTypes.bool,
    placeholder: PropTypes.string,
    nullable: PropTypes.bool
}