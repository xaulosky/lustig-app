import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../componets/dashboard/Layout'
import Escritorio from '../pages/escritorio/Escritorio'
import Clientes from '../pages/Clientes'
import Eventos from '../pages/Eventos'
import Personal from '../pages/Personal'
import Inventario from '../pages/Inventario'
import Evento from '../pages/Evento'
import Servicios from '../pages/Servicios'
import Usuarios from '../pages/Usuarios'


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< Layout />}>
                <Route path="/" element={<Escritorio />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path='/evento/:id' element={<Evento />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="*" element={<h1>Pagina no encontrada</h1>} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes