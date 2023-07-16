import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import PuffLoader from "react-spinners/PuffLoader";
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoginWrapper({children}) {
    const { data, status } = useSession();
    const router = useRouter();

    if ( status === "loading" ) {
        return (
            <div className="h-screen flex flex-col space-y-20 items-center justify-center">
                <div className="text-6xl font-bold"><FontAwesomeIcon icon={faClipboard} /> TodoishAPP</div>
                <h1 className="flex items-center justify-center text-lg"><PuffLoader color="#000" loading={true} /> <span className="font-bold text-3xl inline-block ml-4">Loading...</span></h1>
            </div>
        )

    } else if ( status === "unauthenticated" && !router.pathname.includes("signin") ) {
        router.push('/signin');
    
    } else if ( status === "authenticated" && router.pathname.includes("signin") ) {
        router.push('/');

    } else {

        return (
            <>
                {children}
            </>
        )

    }
}