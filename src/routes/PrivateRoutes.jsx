import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
    const { auth } = useAuth()

    return auth.logged
        ? children
        : <Navigate to="/login" />
}

export default PrivateRoutes