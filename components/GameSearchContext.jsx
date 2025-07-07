import { createContext, useState } from 'react';

export default function GameSearchContext({ children })
{
    let context = createContext()
    const [page, setPage] = useState(0);
    const [gameList, setGameList] = useState([]);


    return <>
        <context.Provider value={{}}>
            {children}
        </context.Provider>
    </>
}