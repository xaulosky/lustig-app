import { useForm } from "react-hook-form"
import apiClientes from "../../api/apiClientes"
import apiUsuarios from "../../api/apiUsuarios"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"


const LoginScreen = () => {


    const { auth, setAuth } = useContext(AuthContext)




    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const login = (data) => {
        console.log(data)
        apiUsuarios.login(data).then(res => {
            console.log(res)
            if (res.status === 200) {
                setAuth({
                    logged: true,
                    token: res.data.token,
                    usuario: res.data.usuario,
                    tipo_usuario: res.data.tipo_usuario
                })
                /* SETLOCAL STORAGE */
                localStorage.setItem('auth', JSON.stringify({
                    logged: true,
                    token: res.data.token,
                    usuario: res.data.usuario,
                    tipo_usuario: res.data.tipo_usuario
                })
                )
            }
        }).catch(err => {
            console.log(err)
        }
        ).finally(() => {
            reset()
        }
        )

    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    Lustig Eventos
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(login)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Usuario
                                </label>
                                <input
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="nombre@email.com"
                                    required=""
                                    {
                                    ...register("email", {
                                        required: true,
                                    })
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    {
                                    ...register("password", {
                                        required: true,
                                    })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-blue-600 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Iniciar Sesión
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LoginScreen