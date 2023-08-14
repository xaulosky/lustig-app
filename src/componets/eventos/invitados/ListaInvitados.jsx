import { Box, Button, ButtonGroup, Fade, Heading, IconButton } from '@chakra-ui/react'
import useInvitados from '../../../hooks/useInvitados'
import Tabla from '../../Tabla/Tabla'
import PropTypes from 'prop-types'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { notificaciones } from '../../../helpers/Notificaciones'
import { useState } from 'react'
import AgregarInvitado from '../mesas/AgregarInvitado'
const ListaInvitados = ({ evento }) => {

    const { invitados, cargando, eliminarInvitado, actualizarInvitados } = useInvitados(() => { }, evento)

    const [agregando, setAgregando] = useState(false)
    const [edicion, setEdicion] = useState(null)

    const columas = [
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Detalles',
            selector: 'detalles',
        },
        {
            name: 'Mesa',
            selector: row => {
                return row.mesa_evento_nombre
            },
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
                            setEdicion(row)
                            setAgregando(true)
                        }}
                    />
                    <IconButton isRound colorScheme='red' icon={<AiFillDelete size={'1.4rem'} />}
                        onClick={async () => {
                            if (!await notificaciones.confirmacion('¿Quitar al invitado?')) return
                            eliminarInvitado(row.id)
                        }}
                    />
                </ButtonGroup>
            ),
        }
    ]



    return (
        <>
            <Fade unmountOnExit in={!agregando} exit={false}>
                <Button mb={4} colorScheme="blue" onClick={() => { setAgregando(true) }}>Agregar Invitado</Button>
                <Tabla
                    click={(row) => {
                        setEdicion(row)
                        setAgregando(true)
                    }}
                    columnas={columas}
                    cargando={cargando}
                    noData={<Box p={20}>
                        {
                            cargando ?
                                <Heading size={'md'}>Cargando...</Heading>
                                : <Heading size={'md'}>No hay invitados</Heading>
                        }
                    </Box>}
                    data={invitados}
                />
            </Fade>
            {agregando && <Fade unmountOnExit in={true} >
                <Button mb={4} colorScheme="blue" onClick={() => {
                    setAgregando(false)
                    setEdicion(null)
                }}>Volver</Button>
                <AgregarInvitado evento={evento}
                    edicion={edicion}
                    volver={() => {
                        setEdicion(null)
                        actualizarInvitados()
                        setAgregando(false)
                    }} />
            </Fade>}
        </>
    )
}

export default ListaInvitados

ListaInvitados.propTypes = {
    evento: PropTypes.string.isRequired
}