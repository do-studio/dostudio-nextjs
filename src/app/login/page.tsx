"use client";
import Link from 'next/link'
import React from 'react'
import { login } from "../utils/action";
import { useFormState } from "react-dom";

const Login = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <main className='w-full h-screen grid place-items-center dologin'>
        <form action={formAction} className='bg-white flex flex-col gap-5 shadow-shadow1  text-black px-10 py-20 w-[90%] md:w-[40%] xl:w-[25%] h-fit'>
            <h2 className=' text-center font-semibold text-4xl'>Do studio</h2>
            <h2 className=' text-center font-medium text-sm -mt-5'>Admin</h2>
            <input type="text" name="username" className='bg-transparent border p-2 outline-none focus:outline-black focus:outline-1 duration-150 placeholder:text-gray-300' placeholder='username'  required/>
            <input type="password" name="password" className='bg-transparent border p-2 outline-none focus:outline-black focus:outline-1 duration-150 placeholder:text-gray-300' placeholder='password' required/>
            <button className='dolgbtn-86'>Login</button>
            {state?.error && <p>{state.error}</p>}
        </form>
    </main>
  )
}

export default Login