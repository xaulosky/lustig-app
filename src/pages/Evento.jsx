import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiEventos from "../api/apiEventos"

const Evento = () => {
    /* get id from url */
    const { id } = useParams()
    const [cargando, setCargando] = useState(false)
    const [data, setData] = useState([])

    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEvento(id).then((res) => {
            setData(res.data)
            console.log(res.data)
        }).finally(() => {
            setCargando(false)
        }
        )
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <h1>{id}</h1>
    )
}

export default Evento