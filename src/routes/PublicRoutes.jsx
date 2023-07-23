import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ children }) => {

    const { auth } = useAuth()
    return auth.logged
        ? <Navigate to="/" />
        : children
}
export default PublicRoutes