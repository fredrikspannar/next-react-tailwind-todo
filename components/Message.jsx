import { useState, useEffect } from "react";

export default function Message({type="information", children, timeout=5000, onTimeoutCallback=false}) {
    const [ isClosed, setIsClosed ] = useState(false);

    // setup message background based on type
    let typeClass = "bg-green-300";
    let borderClass = "border-green-600";

    if ( type.toLowerCase() == 'error' ){
        typeClass = "border-red-600";
        borderClass =  "bg-red-300";
    }

    const closeMessage = () => {
        setIsClosed(true);

        if (onTimeoutCallback !== false) onTimeoutCallback();
    }

    useEffect(() => {
        // hide message efter timeout
        const timer = setTimeout(() => {
            setIsClosed(true);

            if (onTimeoutCallback !== false) onTimeoutCallback();
        }, timeout);

        // setup click event to close now
        document.body.addEventListener('click', closeMessage);

        // cleanup side-effects
        return () => {
            clearTimeout(timer);
            document.body.removeEventListener('click', closeMessage);
        }
    },[]); // no dependencies, run once

    // message should be hidden
    if ( isClosed ) return null;

    // render message
    return (
        <div className="w-screen h-screen bg-zinc-600 bg-opacity-60 z-90 absolute top-0 left-0">
            <div className={`message ${typeClass} ${borderClass}`}>
                {children}
            </div>
        </div>
    )
}