import { createContext, ReactNode, useEffect, useState } from 'react';
import GameSearchContext from './GameSearchContext';
import GetGuid from './GetGuid';


export default function GameSearchContextProvider({ children })
{
    let context = GameSearchContext
    const [page, setPage] = useState(0);
    const [gameList, setGameList] = useState([]);
    const [latestResponse, setLatestResponse] = useState();
    const [query, setQuery] = useState("");
    const [nextPageToken, setNextPageToken] = useState("");

    const [fetchEffectFlag, setFetchEffectFlag] = useState(false);

    const [simpleFilters, setSimpleFilters] = useState({});

    const [guid, setGuid] = useState();

    useEffect(() => {
        setGuid(GetGuid())
    }, []);

    return <>
        <context.Provider value={{page, setPage, gameList, setGameList, latestResponse, setLatestResponse, query, setQuery, nextPageToken, setNextPageToken, simpleFilters, setSimpleFilters, fetchEffectFlag, setFetchEffectFlag, guid, setGuid}}>
            {children}
        </context.Provider>
    </>
}