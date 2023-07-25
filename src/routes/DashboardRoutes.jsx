import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../componets/dashboard/Layout'
import Escritorio from '../pages/escritorio/Escritorio'
import Clientes from '../pages/Clientes'
import Eventos from '../pages/Eventos'


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/escritorio" element={<Escritorio />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/eventos" element={<Eventos />} />


                <Route path="*" element={<h1>Pagina no encontrada</h1>} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes