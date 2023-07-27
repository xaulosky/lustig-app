import axios from "axios"

let source = axios.CancelToken.source()

const config = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    cancelToken: source.token
}

const instance = axios.create(config)

instance.interceptors.request.use(function (config) {
    const state = localStorage.getItem('secreto')
    if (state) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(state).state ? JSON.parse(state).state.token : ""}`
    }
    return config
})
/**
 * Unauthorized Request manda a login
 */
instance.interceptors.response.use((response) => (response), (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.setItem('secreto', '')/* 
        window.location = '/inicio?sesion_expired=true' */
    }
    throw error
})

export default instance