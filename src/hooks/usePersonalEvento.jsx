import React, { useCallback, useEffect, useState } from 'react'
import apiPersonal from '../api/apiPersonal'
import { notificaciones } from '../helpers/Notificaciones'

const usePersonalEvento = (evento, actualizar) => {

    const [cargando, setCargando] = useState(false)
    const [actualizando, setActualizando] = useState(false)
    const [personalEvento, setPersonalEvento] = useState([])

    const getPersonalEvento = React.useCallback(() => {
        apiPersonal.getPersonalEvento().then((res) => {
            setPersonalEvento(res.data)
        }).catch(() => {

        }).finally(() => {
            setCargando(false)
        })
    }, [])

    const createPersonalEvento = useCallback((personalEvento) => {
        setActualizando(true)
        apiPersonal.createPersonalEvento(personalEvento).then((res) => {
            notificaciones.success('Personal agregado')
            getPersonalEvento()
            actualizar && actualizar()
        }).catch(() => {
            notificaciones.error('Error al agregar personal')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getPersonalEvento, actualizar])

    const updatePersonalEvento = useCallback((personalEvento) => {
        setActualizando(true)
        apiPersonal.updatePersonalEvento(personalEvento).then((res) => {
            notificaciones.success('Personal actualizado')
            getPersonalEvento()
            actualizar && actualizar()
        }).catch(() => {
            notificaciones.error('Error al actualizar personal')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getPersonalEvento, actualizar])

    const deletePersonalEvento = useCallback((idPersonal) => {
        setActualizando(true)
        apiPersonal.deletePersonalEvento(evento.id, idPersonal).then((res) => {
            notificaciones.success('Personal eliminado de evento')
            getPersonalEvento()
            actualizar && actualizar()
        }).catch(() => {
            notificaciones.error('Error al eliminar de evento')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getPersonalEvento, evento, actualizar])


    useEffect(() => {
        setCargando(true)
        getPersonalEvento()
    }, [getPersonalEvento])


    return {
        cargando,
        actualizando,
        personalEvento,
        getPersonalEvento,
        createPersonalEvento,
        updatePersonalEvento,
        deletePersonalEvento
    }
}

export default usePersonalEvento