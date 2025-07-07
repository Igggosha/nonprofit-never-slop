import { useCallback, useContext } from 'react';
import Search from './Search';
import GameSearchContext from './GameSearchContext';

export default function MoreRequester()
{
    const {setPage, gameList, setGameList, latestResponse, setLatestResponse, query, setQuery, nextPageToken, setNextPageToken} = useContext(GameSearchContext)
    function requestMore()
    {
        console.log(latestResponse)
        if (latestResponse != null && latestResponse.nextPageToken != null && latestResponse.nextPageToken !== "")
          setNextPageToken(latestResponse.nextPageToken)
    }

    return <>
        <button className={"UniversalButton"} onClick={requestMore}>
            <p>Show More</p>
        </button>
    </>
}