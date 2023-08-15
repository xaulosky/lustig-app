/* eslint-disable react/no-unescaped-entities */
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { Button } from '@chakra-ui/react';
import Header from './Header/Header';

const Layout = () => {
    return (
        <>
            {/* <Header />
            <div className="flex antialiased bg-gray-50 dark:bg-gray-900 dark:text-[#fff] w-100 h-full ">
                <Sidebar />
                <main className="p-5 overflow-y-auto w-full h-65">
                    <Outlet />
                </main>
            </div> */}
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <Header />
                {/* Sidebar */}
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-20 dark:text-white h-screen overflow-auto">
                    <Outlet />
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
                    </div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4" />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                    </div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                    </div> */}
                </main>
            </div>



        </>
    )
}

export default Layout