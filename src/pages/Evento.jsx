import { useParams } from "react-router-dom"

const Evento = () => {
    /* get id from url */
    const { id } = useParams()


    return (
        <h1>{id}</h1>
    )
}

export default Evento