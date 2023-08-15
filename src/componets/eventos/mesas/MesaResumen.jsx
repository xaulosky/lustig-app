import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, Heading, Image, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stat, StatNumber, Text } from '@chakra-ui/react'
import apiMesas from '../../../api/apiMesas'
import { notificaciones } from '../../../helpers/Notificaciones'

const MesaResumen = ({ mesa, actualizar, onClick, seleccionada, seleccionable = true, sinEstado }) => {
    return (
        <Card sx={{
            outline: seleccionada ? '4px solid #3182ce' : 'none',
            '&:hover': seleccionable && {
                boxShadow: '0 0 1rem 0 rgba(136,152,170,.15)!important',
                cursor: seleccionable ? 'pointer' : 'default'
            }

        }}
            onClick={seleccionable ? () => onClick(mesa) : undefined}
        >
            <CardBody pt={3}>
                <Image borderRadius={'6px'} src={
                    mesa.largo && !mesa.ancho ?
                        'https://w7.pngwing.com/pngs/538/436/png-transparent-computer-icons-circle-circle-black-desktop-wallpaper-auto-part.png'
                        : mesa.largo == mesa.ancho ?
                            'https://assets.stickpng.com/images/58afdac9829958a978a4a691.png'
                            : 'https://e7.pngegg.com/pngimages/68/356/png-clipart-laptop-rectangle-drawing-computer-geometry-rectangulo-angle-text-thumbnail.png'
                }
                    aspectRatio={'1/1'} objectFit={'cover'} w={'80%'} h={'auto'} m={'0 auto'} alt={'imagen'} />
                <Text fontWeight={'bold'} color={'gray.600'}>{mesa.nombre}</Text>
                <p>{mesa.largo && !mesa.ancho ?
                    'Redonda'
                    : mesa.largo == mesa.ancho ?
                        'Cuadrada'
                        : 'Rectangular'
                }</p>

            </CardBody>
            <CardFooter pt={0} display={'flex'} alignItems={'center'}>
                {!sinEstado && <Menu>
                    <MenuButton as={Button} size={'sm'} colorScheme='green' onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <Heading size={'sm'}>{mesa?.estado.nombre}</Heading>
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue={`${mesa?.id_estado_mesa_evento}`}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            onChange={
                                (value) => {
                                    apiMesas.updateEstadoMesa(mesa.id, value).then(() => {
                                        actualizar()
                                        notificaciones.success('Estado actualizado')
                                    }).catch(() => {
                                        notificaciones.error('Error al actualizar estado')
                                    })
                                }
                            }>
                            <MenuItemOption value='1' onClick={(e) => {
                                e.stopPropagation()
                            }}>Vacía</MenuItemOption>
                            <MenuItemOption value='2' onClick={(e) => {
                                e.stopPropagation()
                            }}>Montada</MenuItemOption>
                            <MenuItemOption value='3' onClick={(e) => {
                                e.stopPropagation()
                            }}>Plato de Entrada</MenuItemOption>
                            <MenuItemOption value='4' onClick={(e) => {
                                e.stopPropagation()
                            }}>Plato Principal</MenuItemOption>
                            <MenuItemOption value='5' onClick={(e) => {
                                e.stopPropagation()
                            }}>Postre</MenuItemOption>
                            <MenuItemOption value='6' onClick={(e) => {
                                e.stopPropagation()
                            }}>Lista</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>}
                <Stat>
                    <StatNumber textAlign={'end'} fontSize={'md'} color={'green'}>{mesa.invitados.length}/{mesa.cantidad_personas}</StatNumber>
                </Stat>
            </CardFooter>
        </Card>
    )
}

export default MesaResumen

MesaResumen.propTypes = {
    mesa: PropTypes.object.isRequired,
    actualizar: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    seleccionada: PropTypes.bool,
    seleccionable: PropTypes.bool,
    sinEstado: PropTypes.bool
}