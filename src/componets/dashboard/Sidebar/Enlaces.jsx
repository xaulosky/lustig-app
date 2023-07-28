
import { AiFillHome } from 'react-icons/ai'
import { BiClipboard, BiSolidUser } from 'react-icons/bi'



const Enlaces = () => {

    const enlaces = [
        {
            id: 1,
            ruta: '/dashboard',
            nombre: 'Dashboard',
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
            icono: <AiFillHome />
        },
        {
            id: 4,
            ruta: '/personal',
            nombre: 'Personal',
            icono: <AiFillHome />
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
            icono: <AiFillHome />
        }
    ]



    return (
        <>
            {
                enlaces.map((enlace, index) => (
                    <li key={index}>
                        <a
                            href={enlace.ruta}
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            {enlace.icono}
                            <span className="ml-3"> {enlace.nombre} </span>
                        </a>
                    </li>
                ))
            }

        </>
    )
}

export default Enlaces

