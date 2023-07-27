import React, { useEffect, useState } from 'react'
import apiClientes from '../api/apiClientes'
const useTipoCliente = () => {

    const [tiposDeEvento, setTiposDeEvento] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        setCargando(true)
        apiClientes.getClientes().then((res) => {
            setClientes(res.data)
        }).finally(() => {
            setCargando(false)
        })
    }, [])


    return (
        tiposDeEvento
    )
}

export default useClientes