import useMesas from "../../../hooks/useMesas"
import PropTypes from 'prop-types'
import MesaResumen from "./MesaResumen"
import { useState } from "react"
import { Box, Button, Flex, GridItem, Heading, Input, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import useInvitados from "../../../hooks/useInvitados"

const AgregarInvitado = ({ evento, volver, edicion }) => {

    const { mesas, cargandoMesas, actualizarMesas, } = useMesas(evento)

    const { agregarInvitado, editarInvitado } = useInvitados(volver ? volver : undefined, evento)

    const [mesaSeleccionada, setMesaSeleccionada] = useState(edicion?.id_mesa_evento ? { id: edicion.id_mesa_evento } : null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: edicion ? edicion : {}
    })

    const onSubmit = (data) => {
        console.log(data)
        data.id_mesa_evento = mesaSeleccionada.id
        edicion ? editarInvitado(data)
            : agregarInvitado(data)
        !edicion && reset()
    }

    return (
        <>
            <Heading size={'md'}>{edicion ? "Editando" : "Agregando"} Invitado</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex pt={2} gap={5} width={'100%'}>
                    <Box minW={'40%'}>
                        <Text py={1} fontWeight={'bold'} color={'gray.600'}>Nombre</Text>
                        <Input
                            bgColor={'white'}
                            placeholder="Nombre del Invitado"
                            {...register("nombre", { required: true })}
                            borderColor={errors.nombre ? 'red.500' : 'gray.200'}
                        />
                    </Box>
                    <Box minW={'40%'}>
                        <Text py={1} fontWeight={'bold'} color={'gray.600'}>Detalles</Text>

                        <Input bgColor={'white'} placeholder="Detalles adicionales (Vegetariano, etc)"{...register("detalles", { required: false })} />
                    </Box>
                </Flex>


                <Text pt={3} size={'xl'} fontWeight={'bold'} color={'gray.600'}>Seleccione una mesa</Text>
                <SimpleGrid mt={2} mb={5} columns={6} gap={5}>
                    {cargandoMesas ? <Spinner /> : mesas.map((mesa) => {
                        if (mesa.invitados.length >= mesa.cantidad_personas) return null
                        return (<GridItem key={mesa.id}>
                            <MesaResumen
                                mesa={mesa}
                                actualizar={actualizarMesas}
                                onClick={setMesaSeleccionada}
                                seleccionada={mesaSeleccionada?.id === mesa.id}
                                seleccionable={mesaSeleccionada?.id !== mesa.id && mesa.invitados.length < mesa.cantidad_personas}
                                sinEstado={true}
                            />
                        </GridItem>)
                    }
                    )}
                </SimpleGrid>
                <Button type={'submit'} colorScheme="green" isDisabled={
                    !mesaSeleccionada ||
                    errors.nombre
                }>{edicion ? "Editar" : "Agregar"} Invitado</Button>
            </form>
        </>
    )
}

export default AgregarInvitado

AgregarInvitado.propTypes = {
    evento: PropTypes.string.isRequired,
    volver: PropTypes.func.isRequired,
    edicion: PropTypes.object
}