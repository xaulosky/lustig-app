import React, { useState, useCallback, useEffect } from 'react'
import apiEventos from '../api/apiEventos'
import { notificaciones } from '../helpers/Notificaciones'

const useGastos = (evento, actualizar) => {

    const [cargando, setCargando] = useState(false)
    const [gastos, setGastos] = useState([])
    const [actualizando, setActualizando] = useState(false)


    const getGastos = useCallback(async () => {
        apiEventos.getGastos(evento)
            .then((res) => {
                setGastos(res.data)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setCargando(false)
            })
    }, [evento])

    const createGasto = useCallback(async (gasto) => {
        apiEventos.createGasto(gasto)
            .then((res) => {
                notificaciones.success('Gasto añadido')
                getGastos()
                actualizar && actualizar()
            }).catch((err) => {
                notificaciones.error('Error al añadir')
            }).finally(() => {
                setCargando(false)
            })
    }, [getGastos, actualizar])

    const updateGasto = useCallback(async (gasto) => {
        apiEventos.updateGasto(gasto)
            .then((res) => {
                notificaciones.success('Gasto actualizado')
                getGastos()
                actualizar && actualizar()
            }).catch((err) => {
                notificaciones.error('Error al actualizar')
            }).finally(() => {
                setCargando(false)
            })
    }, [getGastos, actualizar])

    const deleteGasto = useCallback(async (id) => {
        apiEventos.deleteGasto(id)
            .then((res) => {
                notificaciones.success('Gasto eliminado')
                getGastos()
                actualizar && actualizar()
            }).catch((err) => {
                notificaciones.error('Error al eliminar')
            }).finally(() => {
                setCargando(false)
            })
    }, [getGastos, actualizar])

    useEffect(() => {
        if (evento) {
            setCargando(true)
            getGastos()
        }
    }, [evento, getGastos])

    return {
        cargando,
        gastos,
        getGastos,
        createGasto,
        updateGasto,
        deleteGasto,
        actualizando,
    }
}

export default useGastos