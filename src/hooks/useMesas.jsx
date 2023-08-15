/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import apiMesas from '../api/apiMesas'
import { notificaciones } from '../helpers/Notificaciones'

const useMesas = (id, actualizar) => {

    const [cargando, setCargando] = useState(false)
    const [mesas, setMesas] = useState([])

    const [actualizando, setActualizando] = useState(false)

    const getMesas = useCallback(() => {
        apiMesas.getMesas(id).then((res) => {
            setMesas(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCargando(false)
        })
    }, [id])

    const agregarMesa = useCallback((mesa) => {
        setActualizando(true)
        apiMesas.createMesa(mesa).then((res) => {
            getMesas()
            notificaciones.success('Mesa agregada')
            actualizar && actualizar()
        }).catch((err) => {
            notificaciones.error('Error al agregar mesa')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getMesas, actualizar])

    const eliminarMesa = useCallback((id, then) => {
        setActualizando(true)
        apiMesas.deleteMesa(id).then((res) => {
            getMesas()
            notificaciones.success('Mesa eliminada')
            actualizar && actualizar()
            then && then()
        }).catch((err) => {
            notificaciones.error('Error al eliminar mesa')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getMesas, actualizar])

    useEffect(() => {
        setCargando(true)
        getMesas()
    }, [getMesas])

    return {
        mesas,
        actualizarMesas: getMesas,
        cargandoMesas: cargando,
        agregarMesa,
        eliminarMesa,
        actualizandoMesas: actualizando
    }
}

export default useMesas