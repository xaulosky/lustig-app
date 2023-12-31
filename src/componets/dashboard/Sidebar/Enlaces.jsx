
import { AiFillHome } from 'react-icons/ai'
import { BiClipboard, BiSolidUser, BiUser } from 'react-icons/bi'
import { BsCalendar2EventFill, BsFillPeopleFill } from 'react-icons/bs'
import { MdHomeRepairService } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const Enlaces = () => {

    const enlaces = [
        {
            id: 1,
            ruta: '/',
            nombre: 'Escritorio',
            icono: <AiFillHome />
        },
        {
            id: 2,
            ruta: '/clientes',
            nombre: 'Clientes',
            icono: <BiSolidUser />
        },
        {
            id: 3,
            ruta: '/eventos',
            nombre: 'Eventos',
            icono: <BsCalendar2EventFill />
        },
        {
            id: 4,
            ruta: '/personal',
            nombre: 'Personal',
            icono: <BsFillPeopleFill />
        },
        {
            id: 5,
            ruta: '/inventario',
            nombre: 'Inventario',
            icono: <BiClipboard />
        },
        {
            id: 6,
            ruta: '/servicios',
            nombre: 'Servicios',
            icono: <MdHomeRepairService />
        },
        {
            id: 7,
            ruta: '/usuarios',
            nombre: 'Usuarios',
            icono: <BiUser />
        }
    ]

    const { auth } = useAuth()

    const { tipo_usuario } = auth

    return (
        <>
            {
                enlaces.map((enlace, index) => (
                    tipo_usuario != "Administrador" && enlace.id === 7 ? null
                        : <li key={index}>
                            <NavLink
                                to={enlace.ruta}
                                className={
                                    ({ isActive, isPending }) =>
                                        isPending ?
                                            "pending flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" :
                                            isActive ? "active flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" :
                                                "flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                }
                            >
                                {enlace.icono}
                                <span className="ml-3"> {enlace.nombre} </span>
                            </NavLink>
                        </li >
                ))
            }

        </>
    )
}

export default Enlaces

