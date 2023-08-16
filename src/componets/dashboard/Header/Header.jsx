import { Button } from '@chakra-ui/react'
import React from 'react'
import SidebarMobile from '../Sidebar/SidebarMobile'

const Header = () => {

    const cerrarSesion = () => {
        localStorage.removeItem('auth')
        window.location.href = '/'
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                    <button
                        data-drawer-target="drawer-navigation"
                        data-drawer-toggle="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                       
                        <SidebarMobile />
                    </button>
                    <a
                        href="https://flowbite.com"
                        className="flex items-center justify-between mr-4"
                    >

                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Lustig
                        </span>
                    </a>

                </div>
                <Button onClick={cerrarSesion} className="bg-primary-500 dark:bg-primary-600">
                    Cerrar Sesión
                </Button>
            </div>
        </nav>


    )
}

export default Header