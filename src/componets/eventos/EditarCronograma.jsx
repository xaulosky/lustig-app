import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import apiEventos from '../../api/apiEventos'

const EditarCronograma = ({ id, cronograma, setCronograma, setEditarCronograma }) => {

    const [cargando, setCargando] = useState(false)

    const onSubmit = () => {
        setCargando(true)
        apiEventos.editarCronograma(id, cronograma).then((res) => {
            setCargando(false)
            setEditarCronograma(false)
        })
    }
    return (
        <>
            <ReactQuill theme="snow" value={cronograma} onChange={setCronograma} />
            <Button isLoading={cargando} onClick={onSubmit}>Guardar</Button>
        </>
    )
}

export default EditarCronograma