import React, { useEffect, useState } from 'react'
import apiClientes from '../api/apiClientes'
const useClientes = () => {

    const [clientes, setClientes] = useState([])
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
        clientes
    )
}

export default useClientes