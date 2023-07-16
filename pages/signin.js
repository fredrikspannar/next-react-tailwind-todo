import { signIn } from 'next-auth/react';


export default function signin() {


    const handleGoogleLogin = () => {
        signIn('google' );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            
                <button className="px-8 py-4 bg-orange-400 font-bold rounded-xl h-fit min-w-[400px] text-xl" onClick={handleGoogleLogin}>Login with Google</button>
            
        </div>
    )
}