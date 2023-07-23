import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';



const Layout = () => {
    return (
        <>
            <Header />
            <div className="flex antialiased bg-gray-50 dark:bg-gray-900 dark:text-[#fff] w-100">
                <Sidebar />
                <main className="p-5 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout