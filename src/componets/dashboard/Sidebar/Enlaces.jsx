
import { AiFillHome } from 'react-icons/ai'



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
            icono: <AiFillHome />
        }
    ]



    return (
        <>
            <ul className="space-y-2" >

                {
                    enlaces.map((enlace) => (
                        <li key={enlace.id}>
                            <a href={enlace.ruta} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {enlace.icono}    <span className="ml-3">{enlace.nombre}</span>
                            </a>
                        </li>
                    ))

                }

            </ul >
        </>
    )
}

export default Enlaces


                {/*  
                <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                        <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
                            6
                        </span>
                    </a>
                </li> 
*/}