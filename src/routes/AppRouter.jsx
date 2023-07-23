import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import DashboardRoutes from './DashboardRoutes'
import LoginScreen from '../pages/login/LoginScreen'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes >
                        <LoginScreen />
                    </PublicRoutes>
                } />
                <Route path="/*" element={
                    <PrivateRoutes>
                        <DashboardRoutes />
                    </PrivateRoutes>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter