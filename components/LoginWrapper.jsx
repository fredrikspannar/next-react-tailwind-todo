import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function LoginWrapper({children}) {
    const { data, status } = useSession();
    const router = useRouter();

console.log('LoginWrapper session =',{ 'status':status, 'data': data });

    if ( status == "loading" ) {
        return (
            <h1>Loading...</h1>
        )

    } else if ( status == "unauthenticated" && !router.pathname.includes("signin") ) {
        router.push('/signin');
    
    } else {

        return (
            <>
                {children}
            </>
        )

    }
}