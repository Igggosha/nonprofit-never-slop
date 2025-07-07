import { useContext, useEffect, useState } from 'react';
import Search from './Search';
import GameSearchContext from './GameSearchContext';

export default function SearchBlock()
{
    const {setPage, gameList, setGameList, latestResponse, setLatestResponse, query, setQuery, nextPageToken, setNextPageToken} = useContext(GameSearchContext)
    // const [response, setResponse] = useState("");
    // const [query, setQuery] = useState("");

    useEffect(() => {
        async function getData()
        {
            console.log(query)
            if (query != "")
            {
                console.log("fetching")
                let json = await Search(query, nextPageToken)

                console.log(json)
                setLatestResponse(json)
                setGameList([...gameList, ...json.searchResults])
            }
        }

        getData()

    }, [query, nextPageToken]);

    function SubmitForm(e)
    {
        e.preventDefault()
        let formData = new FormData(e.target)
        let entries = Object.fromEntries(formData.entries())

        setQuery(entries.query)
        setGameList([])
        setNextPageToken("")
    }


    return <>
        <form action="" onSubmit={SubmitForm}>
            <label htmlFor="query"></label> <input type="text" placeholder="Search Query" name="query"/>
            <input type="submit" value="Send Terry Davis agents" className={"rounded-md flex items-center bg-blue-400 text-white border border-transparent py-2 px-4 text-center text-sm transition-all hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"}/>
        </form>
    </>
}