import useMesas from "../../../hooks/useMesas"
import PropTypes from 'prop-types'
import { Box, Button, Divider, Flex, GridItem, Heading, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, SimpleGrid, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useState } from "react"

const AgregarMesa = ({ evento, volver, edicion }) => {

    const { agregarMesa, actualizandoMesas } = useMesas(evento, volver)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: edicion ? edicion : {}
    })

    const [tipoMesa, setTipoMesa] = useState(1)

    const onSubmit = (data) => {
        console.log(data)
        const largo = data.largo && !data.ancho ?
            1
            : data.largo == data.ancho ?
                1
                : 2

        const ancho = data.largo && !data.ancho ?
            null
            : data.largo == data.ancho ?
                1
                : 1

        data.largo = largo
        data.ancho = ancho
        data.id_evento = evento
        agregarMesa(data)
        !edicion && reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontWeight={'bold'} py={2} color={'gray.600'}>Nombre</Text>
            <Input {...register("nombre", { required: true })}
                borderColor={errors.nombre ? 'red.500' : 'gray.200'}
            />
            <Text fontWeight={'bold'} color={'gray.600'} py={2}>Cantidad de personas</Text>
            <Input type="number" {...register("cantidad_personas", { required: true, valueAsNumber: true, })} />
            <Flex py={5} justify={'center'} gap={3}>

                <Text color={'gray.600'} fontWeight={'bold'} display={'inline'} pt={2}>Tipo :</Text>
                <Menu>
                    <MenuButton as={Button} colorScheme='blue' display={'inline'} >
                        <Heading size={'md'}>{
                            tipoMesa == 1 ? 'Redonda'
                                : tipoMesa == 2 ? 'Cuadrada'
                                    : 'Rectangular'
                        }
                        </Heading>
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue={1} onChange={
                            (value) => {
                                setTipoMesa(value)
                            }
                        }>
                            <MenuItemOption value='1'>Redonda</MenuItemOption>
                            <MenuItemOption value='2'>Cuadrada</MenuItemOption>
                            <MenuItemOption value='3'>Rectangular</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Flex>
            <Divider py={1} />
            <Button mt={4} type={'submit'} colorScheme="green" isDisabled={
                errors.nombre
            }
                isLoading={actualizandoMesas}
            >{edicion ? "Editar" : "Agregar"} Mesa</Button>
        </form>
    )
}

export default AgregarMesa

AgregarMesa.propTypes = {
    evento: PropTypes.string.isRequired,
    volver: PropTypes.func.isRequired,
    edicion: PropTypes.object
}