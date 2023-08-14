import useMesas from "../../../hooks/useMesas"
import PropTypes from 'prop-types'
import { Button, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

const AgregarMesa = ({ evento, volver, edicion }) => {

    const { agregarMesa, actualizandoMesas } = useMesas(evento, volver)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: edicion ? edicion : {}
    })

    const onSubmit = (data) => {
        console.log(data)
        data.largo = data.largo ? data.largo : null
        data.ancho = data.ancho ? data.ancho : null
        data.id_evento = evento
        agregarMesa(data)
        !edicion && reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Text p={2}>Nombre</Text>
                <Input {...register("nombre", { required: true })}
                    borderColor={errors.nombre ? 'red.500' : 'gray.200'}
                />

                <Text p={2}>Cantidad máxima de personas</Text>
                <Input type="number" {...register("cantidad_personas", { required: true, valueAsNumber: true, })} />

                <Text p={2}>Largo</Text>
                <Input type="number"{...register("largo", { required: false, valueAsNumber: true, })} />

                <Text p={2}>Ancho</Text>
                <Input type="number"{...register("ancho", { required: false, valueAsNumber: true, })} />


                <Button mt={4} type={'submit'} colorScheme="green" isDisabled={
                    errors.nombre
                }
                    isLoading={actualizandoMesas}
                >{edicion ? "Editar" : "Agregar"} Mesa</Button>
            </form>
        </>
    )
}

export default AgregarMesa

AgregarMesa.propTypes = {
    evento: PropTypes.string.isRequired,
    volver: PropTypes.func.isRequired,
    edicion: PropTypes.object
}