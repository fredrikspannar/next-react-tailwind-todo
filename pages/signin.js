import { signIn } from 'next-auth/react';
import Image from 'next/image';
import googleImage from '../images/google.png';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function signin() {

    const handleGoogleLogin = () => {
        signIn('google' );
    }

    return (
        <div className="h-screen flex flex-col space-y-20 items-center justify-center">
            <div className="mb-20 text-center">
                <div className="text-5xl font-bold"><FontAwesomeIcon icon={faClipboard} /> TodoishAPP</div>
                <p className="mt-6 text-xl">Login with one of the options below to start<br/>using your personal todo and create lists.</p>
            </div>

            <div>
                <button className="px-8 py-4 bg-slate-200 font-bold rounded-xl h-fit min-w-[400px] text-xl flex justify-center items-center hover:bg-slate-400" onClick={handleGoogleLogin}>
                <Image src={googleImage} alt="Login with Google" className="mr-4 w-8 h-8 inline" />
                    Login with Google
                </button>
            </div>
        </div>
    )
}