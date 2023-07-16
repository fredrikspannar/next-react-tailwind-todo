import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from 'next-auth/react';

export default function Layout({children}) {
    const { data, status } = useSession();
    
    //console.log('Layout has status = ',status);

    if ( status === "loading" || status === "unauthenticated") return ( <div className="container mx-auto">{children}</div> );

    return (
        <div className="container mx-auto">
            <nav className="flex justify-between">
                <div className="text-5xl font-bold"><FontAwesomeIcon icon={faClipboard} /> TodoishAPP</div>
                <div className="">
                    {status === "authenticated" && (
                        <>
                            <p>Welcome {data.user.name}!</p>
                            <p>
                                <button className="px-4 py-1 mt-2 bg-orange-600 rounded-xl hover:bg-orange-800 text-white" onClick={signOut}>Log out</button>
                            </p>
                        </>
                    )}
                </div>
            </nav>
            {children}
        </div>
    )
}