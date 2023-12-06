import { useMutation } from "react-query"
import { tryLogin } from "../services/user"
import { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: (data: { mail: string, pass: string }) => tryLogin(data),
        onSuccess: (data) => {
            setUser(data)
            console.log(data)
        }
    })

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value)
    }

    const handlePassChange = (event:any) => {
        setPass(event.target.value)
    }

    const submit = () => {
        loginMutation.mutate({ mail: email, pass: pass })
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        const timeoutId = setTimeout(() => {
            navigate("/");
        }, 1 * 1000);
        return () => clearTimeout(timeoutId);
    }, [user]);

    return (
        <div className="py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Iniciar Sesion en WaveAlert</h1>
                        </div>
                        <div className="flex flex-col divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label for="email" className="left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                    <input value={email} onChange={handleEmailChange} autocomplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />

                                </div>
                                <div className="flex flex-col mt-8">
                                    <label for="password" className="left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña</label>
                                    <input value={pass} onChange={handlePassChange} autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />

                                </div>
                                <div className="relative">
                                    <button onClick={submit} className="bg-blue-500 text-white rounded-md px-2 py-1">Ingresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;