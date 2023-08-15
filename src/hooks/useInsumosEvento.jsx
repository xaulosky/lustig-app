import { useCallback, useEffect, useState } from 'react'
import apiInventario from '../api/apiInventario'
import { notificaciones } from '../helpers/Notificaciones'
import Swal from 'sweetalert2'

const useInsumosEvento = (evento, actualizar) => {

    const [cargando, setCargando] = useState(false)
    const [insumos, setInsumos] = useState([])
    const [actualizando, setActualizando] = useState(false)

    const getInsumos = useCallback(() => {
        apiInventario.getInsumosEvento(evento).then((res) => {
            setInsumos(res.data)
        }).catch(() => { })
            .finally(() => {
                setCargando(false)
            })
    }, [evento])

    const createInsumoEvento = useCallback((insumo) => {
        setActualizando(true)
        apiInventario.createInsumoEvento(insumo).then(() => {
            notificaciones.success('Agregado correctamente al evento')
            getInsumos()
            actualizar && actualizar()
        }).catch((err) => {
            if (err.response?.data?.exceso) {
                notificaciones.warning('No hay suficiente en inventario')
                return
            }
            notificaciones.error('Error al agregar al evento')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getInsumos, actualizar])

    const updateInsumoEvento = useCallback(async (insumo) => {

        const { value: cantidad_a_usar } = await Swal.fire({
            title: 'Cantidad a usar',
            input: 'number',
            inputValue: insumo.cantidad_a_usar,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Actualizar',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Agregar cantidad'
                }
            }
        })

        if (!cantidad_a_usar) return

        setActualizando(true)
        insumo.cantidad_a_usar = cantidad_a_usar
        apiInventario.updateInsumoEvento(insumo).then(() => {
            notificaciones.success('Actualizado correctamente')
            getInsumos()
            actualizar && actualizar()
        }).catch(() => {
            notificaciones.error('Error al actualizar')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getInsumos, actualizar])

    const deleteInsumoEvento = useCallback((id) => {
        setActualizando(true)
        apiInventario.deleteInsumoEvento(id).then(() => {
            notificaciones.success('Eliminado correctamente')
            getInsumos()
            actualizar && actualizar()
        }).catch(() => {
            notificaciones.error('Error al eliminar')
        }).finally(() => {
            setActualizando(false)
        })
    }, [getInsumos, actualizar])

    useEffect(() => {
        if (evento) {
            setCargando(true)
            getInsumos()
        }
    }, [evento, getInsumos])

    return {
        cargando,
        insumos,
        getInsumos,
        actualizando,
        createInsumoEvento,
        updateInsumoEvento,
        deleteInsumoEvento
    }
}

export default useInsumosEvento