import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import ReactQuill from 'react-quill'

const EditarCronograma = () => {
    const [value, setValue] = useState('')

    const onSubmit = () => {
        console.log(value)
    }


    return (
        <>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Button onClick={onSubmit} >Guardar</Button>
        </>
    )
}

export default EditarCronograma