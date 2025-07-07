import { createContext, ReactNode, useState } from 'react';
import GameSearchContext from './GameSearchContext';


export default function GameSearchContextProvider({ children })
{
    let context = GameSearchContext
    const [page, setPage] = useState(0);
    const [gameList, setGameList] = useState([]);
    const [latestResponse, setLatestResponse] = useState();
    const [query, setQuery] = useState("");
    const [nextPageToken, setNextPageToken] = useState("");

    const [simpleFilters, setSimpleFilters] = useState({});

    return <>
        <context.Provider value={{page, setPage, gameList, setGameList, latestResponse, setLatestResponse, query, setQuery, nextPageToken, setNextPageToken, simpleFilters, setSimpleFilters}}>
            {children}
        </context.Provider>
    </>
}