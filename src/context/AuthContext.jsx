import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const login = JSON.parse(localStorage.getItem('auth')) || { logged: true };

    const [auth, setAuth] = useState(login);

    const data = {
        auth,
        setAuth
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };

export default AuthContext;