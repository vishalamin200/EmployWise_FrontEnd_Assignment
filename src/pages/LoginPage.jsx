import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import loginPageVideo from '../assets/Videos/login-page-video.mp4'
import { Login } from '../redux-toolkit/UserSlice'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            toast.error('Email Is Required')
            return
        }
        if (!password) {
            toast.error('Password Is Required')
            return
        }
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!emailRegex.test(email)) {
            toast.error('Enter Valid Email')
            return
        }

        const thunkResponse = await dispatch(Login({ email, password }))
        if (thunkResponse?.payload?.token) {
            navigate('/user-list')
        } else {
            return
        }
    }
    return (
        <div id='login-page' className='flex h-screen w-full'>

            <div id='sidebar-video' className=" hidden h-full w-3/12 bg-[#171230]  lg:block">
                <video src={loginPageVideo} muted playsInline autoPlay loop
                    controls={false} className='pointer-events-none h-full w-full object-cover '></video>
            </div>

            <div className="mx-10 mt-12 flex w-full flex-col gap-y-8 md:mx-auto md:w-1/2 md:self-center lg:ml-56 lg:w-96 ">

                <h1 className="text-[22px] font-bold">Sign in to EmployWise</h1>

                <button id='google-auth-button' className="flex h-12  w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border border-gray-400 transition-transform duration-300 ease-in-out active:scale-95">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="float-left w-5" />
                    <span className="text-black ">Sign in with Google</span>
                </button>

                <div id="line-break" className='flex w-full items-center justify-center gap-x-3'>
                    <hr className='w-1/4' />
                    <span>or sign in with email</span>
                    <hr className='w-1/4' />
                </div>

                <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-4'>

                    <div id="email" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <p className="font-bold">Username or Email</p>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='h-12 w-full rounded-lg border  border-gray-400 pl-3 transition-all  duration-300 hover:shadow-md focus:outline-none'
                        />
                    </div>

                    <div id="password" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <div className='flex justify-between'>
                            <p className="font-bold">Password</p>
                            <a href='' className='cursor-pointer text-sm text-gray-700 underline'>Forgot?</a>
                        </div>
                        <input
                            type='text'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='h-12 w-full rounded-lg border  border-gray-400 pl-3 transition-all  duration-300 hover:shadow-md focus:outline-none'
                        />
                    </div>

                    <button type='submit' id='submit-button' className="mt-2 flex h-12 w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border border-black bg-black text-white transition-transform duration-300 ease-in-out active:scale-95">
                        <span className="text-sm font-bold">Sign in</span>
                    </button>
                </form>

                <p className='text-md text-center'>Don&apos;t have an account? <a href='' className='underline'>Sign up</a></p>

            </div>
        </div>
    )
}

export default LoginPage