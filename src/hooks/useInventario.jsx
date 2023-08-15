import { useCallback, useEffect, useState } from 'react'
import apiInventario from '../api/apiInventario'

const useInventario = () => {

    const [cargando, setCargando] = useState(false)
    const [inventario, setInventario] = useState([])

    const getInventario = useCallback(() => {
        apiInventario.getInventario().then((res) => {
            setInventario(res.data)
        }).catch(() => { })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    useEffect(() => {
        setCargando(true)
        getInventario()
    }, [getInventario])


    return {
        cargando,
        inventario,
        getInventario
    }
}

export default useInventario