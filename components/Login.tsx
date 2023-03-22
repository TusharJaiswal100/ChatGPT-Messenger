'use client' // client component
import { signIn } from "next-auth/react";
import Image from "next/image";

 function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center 
    justify-center text-center">
    <Image        // chatgpt logo
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="logo"
    /> 
    <button onClick={() => signIn("google")} className="text-white font-bold text-3xl animate-pulse">Sign In to use ChatGPT</button> 
    {/* by using above onclick line we are doing authetication with google video at 1:13:00 */}
    </div> 
  )
}

export default Login