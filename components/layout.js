import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

export default function Layout({children}) {
    return (
        <div className="container mx-auto">
            <nav className="text-5xl font-bold text-center">
                <FontAwesomeIcon icon={faClipboard} /> TodoishAPP
            </nav>
            {children}
        </div>
    )
}