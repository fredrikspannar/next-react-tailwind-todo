import { signIn } from 'next-auth/react';
import { useSearchParams } from "next/navigation";

export default function signin() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleGoogleLogin = () => {
        signIn('google',  { callbackUrl } );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            
                <button className="px-8 py-4 bg-orange-400 font-bold rounded-xl h-fit min-w-[400px] text-xl" onClick={handleGoogleLogin}>Login with Google</button>
            
        </div>
    )
}