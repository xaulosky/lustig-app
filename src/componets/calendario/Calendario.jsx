import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useCallback, useEffect, useState } from 'react'
import { notificaciones } from '../../helpers/Notificaciones'
import apiEventos from '../../api/apiEventos'
import esLocale from '@fullcalendar/core/locales/es'
import Swal from 'sweetalert2'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from 'react-router-dom'
import { redirect } from "react-router-dom";


const Calendario = ({ tipo, acciones, titulo }) => {

    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [listaEventos, setListaEventos] = useState([])

    const getData = useCallback(() => {
        setCargando(true)
        apiEventos.getEventos().then((res) => {
            setData(res.data)
            console.log(res.data)
            if (res.data.length === 0) {
                notificaciones.error("No hay eventos")
            }
        }).finally(() => {
            setCargando(false)
        }
        )
    }, [])


    /* retorna el nombre del evento y la fecha de este en otro array */
    const obtenerFechas = () => {
        let eventos = []
        data.map((evento) => {
            eventos.push({ title: evento.nombre, date: evento.fecha, evento: evento })
        })
        setListaEventos(eventos)
    }


    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        obtenerFechas()
    }, [data])

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                initialView={tipo}
                locale={esLocale}
                events={listaEventos}
                height="auto"
                loading={isLoading}
                headerToolbar={{
                    left: acciones ? 'prev,next today' : "",
                    center: titulo ? 'title' : "",
                    right: acciones ? 'dayGridMonth,dayGridWeek' : ""
                }}
                eventClick={(info) => {
                    /*  info.event.extendedProps.evento */
                    console.log(info.event.extendedProps.evento)
                    navigate(`/evento/${info.event.extendedProps.evento.id}`)

                    /* Swal.fire({
                        title: info.event.title,
                        html: `
                        <b>Fecha:</b> 
                        ${info.event.start.toLocaleDateString()} <br> 
                        <b>Hora:</b> ${info.event.start.toLocaleTimeString()} <br> 
                        <b>Descripción:</b> 
                        ${info.event.extendedProps.evento.descripcion} <br>
                        <b>Ubicación:</b>
                        ${info.event.extendedProps.evento.ubicacion} <br>
                        <b>Cliente:</b>
                        ${info.event.extendedProps.evento.cliente_nombre} ${info.event.extendedProps.evento.cliente_apellido} <br>
                        <b>Estado:</b>
                        ${info.event.extendedProps.evento.tipo_evento} <br>
                        
                        `
                    }) */
                }}

            />
        </>
    )
}

export default Calendario