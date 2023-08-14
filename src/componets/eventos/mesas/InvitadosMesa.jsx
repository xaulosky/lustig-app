import { Box, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiFillDelete } from "react-icons/ai";
import { notificaciones } from '../../../helpers/Notificaciones';
import useInvitados from '../../../hooks/useInvitados';


const InvitadosMesa = ({ invitado, actualizar }) => {

    const { cargandoInvitados: cargando, eliminarInvitado, actualizandoInvitados: actualizando } = useInvitados(actualizar)

    const quitarInvitado = async () => {
        if (!await notificaciones.confirmacion('¿Quitar al invitado?')) return
        eliminarInvitado(invitado.id)
    }

    return (
        <Flex px={5} py={3} justify={'space-between'} color={'gray.600'} align={'center'}>
            <Box>
                <Text fontSize={'lg'} fontWeight={'bold'}>
                    {invitado.nombre}
                </Text>
                <Text fontSize={'md'}>
                    {invitado.detalles}
                </Text>
            </Box>
            <ButtonGroup gap={0}>
                {/* <IconButton isDisabled={cargando && actualizando} isRound colorScheme={'blue'} ><AiTwotoneEdit size={'1.4rem'} /></IconButton> */}
                <IconButton isDisabled={cargando && actualizando} isRound colorScheme={'red'}
                    onClick={quitarInvitado}
                ><AiFillDelete size={'1.4rem'} /></IconButton>
            </ButtonGroup>
        </Flex >
    )
}

export default InvitadosMesa

InvitadosMesa.propTypes = {
    invitado: PropTypes.object.isRequired,
    actualizar: PropTypes.func.isRequired
}