import { useCallback, useEffect, useState } from 'react'
import { notificaciones } from '../helpers/Notificaciones'
import apiInvitados from '../api/apiInvitados'

const useInvitados = (actualizar, idEvento) => {

    const [invitados, setInvitados] = useState([])
    const [cargando, setCargando] = useState(false)
    const [actualizando, setActualizando] = useState(false)

    const getInvitados = useCallback(() => {
        setActualizando(true)
        apiInvitados.getInvitados(idEvento).then((res) => {
            setInvitados(res.data)
        }).catch(() => {
        }).finally(() => {
            setCargando(false)
        })
    }, [idEvento])

    const agregarInvitado = useCallback((invitado) => {
        apiInvitados.createInvitado(invitado).then(() => {
            getInvitados()
            notificaciones.success('Invitado agregado')
        }).catch(() => {
            notificaciones.error('Error al agregar invitado')
        }).finally(() => {
            setActualizando(false)
            setCargando(false)
            actualizar && actualizar()
        })
    }, [getInvitados, actualizar])

    const editarInvitado = useCallback((invitado) => {
        apiInvitados.updateInvitado(invitado).then(() => {
            getInvitados()
            notificaciones.success('Invitado editado')
        }).catch(() => {
            notificaciones.error('Error al editar invitado')
        }).finally(() => {
            setActualizando(false)
            actualizar && actualizar()
        })
    }, [getInvitados, actualizar])

    const eliminarInvitado = useCallback((id) => {
        apiInvitados.deleteInvitado(id).then(() => {
            notificaciones.success('Invitado eliminado')
            getInvitados()
        }).catch(() => {
            notificaciones.error('Error al eliminar invitado')
        }).finally(() => {
            setActualizando(false)
            actualizar && actualizar()
        })
    }, [getInvitados, actualizar])

    useEffect(() => {
        if (idEvento) {
            setCargando(true)
            getInvitados()
        }
    }, [getInvitados, idEvento])

    return {
        invitados,
        actualizarInvitados: getInvitados,
        cargandoInvitados: cargando,
        actualizandoInvitados: actualizando,
        agregarInvitado,
        editarInvitado,
        eliminarInvitado,
    }
}

export default useInvitados