/* eslint-disable react/no-unescaped-entities */
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { Button } from '@chakra-ui/react';
import Header from './Header/Header';

const Layout = () => {
    return (
        <>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <Header />
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-20 md:pt-16  dark:text-white h-screen overflow-auto">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout