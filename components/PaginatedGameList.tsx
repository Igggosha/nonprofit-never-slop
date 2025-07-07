import { useCallback, useContext } from 'react';
import GameSearchContext from './GameSearchContext';


type SimpleFilters =
    {
        minPlayers?: number;
        maxPlayers?: number;
        minVoteRatio?: number;
        minMinAge?: number;
        maxMinAge?: number;
    }

type GameData =
{
    ageRecommendationDisplayName: string
    contentId: string
    contentType: "Game"

    creatorHasVerifiedBadge: boolean
    creatorId: number // doesnt work?? nice one david.
    creatorName: string

    defaultLayoutData: unknown
    description: string // not passed here i think. nice one david.
    emphasis: boolean
    isSponsored: boolean

    minimumAge: number
    name: string

    nativeAdData: string // no idea what this is

    playerCount: number

    rootPlaceId: number

    totalDownVotes: number
    totalUpVotes: number

    universeId: number // same as content id. nice one david.

}

type GameResult =
{
    contentGroupType: string
    contents: GameData[]
    topicId: string
}

type JsonResponse =
{
    searchResults: GameResult[]
    nextPageToken: string
}

function SponsoredBar({ props }: {props: {isSponsored: boolean}})
{
    if (props.isSponsored)
    {
        return <>
            <br/>
            <b className={"text-red-900"}>{"WARNING! THIS GAME IS 'SPONSORED'."}</b>
        </>
    }
}

export default function PaginatedGameList()
{
    const {page, setPage, gameList , setGameList, latestResponse, setLatestResponse, simpleFilters, setSimpleFilters} = useContext(GameSearchContext)

    const gamePassesFilters = useCallback(function (game: GameData)
    {
        // console.log(simpleFilters.maxPlayers)
        // console.log(game.playerCount)
        return (
            (simpleFilters.minPlayers == null || game.playerCount >= simpleFilters.minPlayers)
            && (simpleFilters.maxPlayers == null || game.playerCount <= simpleFilters.maxPlayers)
            && (simpleFilters.minMinAge == null || game.minimumAge >= simpleFilters.minMinAge)
            && (simpleFilters.maxMinAge == null || game.minimumAge <= simpleFilters.maxMinAge)
            && (simpleFilters.minVoteRatio == null || (game.totalUpVotes / (game.totalDownVotes + game.totalUpVotes) * 100) > simpleFilters.minVoteRatio)
        )
    }, [simpleFilters])

    return <>
        <p>Results:</p>
        <ul className={"GameListHolder"}>
            {
                gameList.map((item: GameResult) => {
                    // console.log(item)
                    if (gamePassesFilters(item.contents[0]))
                    return (
                        <li key={item.contents[0].contentId} className={"GameListItem"}>
                            <h3>{item.contents[0].name }</h3>
                            <br/>
                            <p>Current players: <em>{item.contents[0].playerCount}</em></p>
                            <p>Upvotes: <b className={"text-lime-500"}>{item.contents[0].totalUpVotes}</b></p>
                            <p>Downvotes: <b className={"text-red-900"}>{item.contents[0].totalDownVotes}</b></p>
                            <p>Ratio: <b>{Math.round(item.contents[0].totalUpVotes / (item.contents[0].totalUpVotes + item.contents[0].totalDownVotes) * 100)}%</b></p>

                            <SponsoredBar props={{ isSponsored: item.contents[0].isSponsored }}/>



                            <br/>
                            <hr/>
                            <br/>
                            <a href={`https://roblox.com/games/${item.contents[0].rootPlaceId}`}>
                                <div className={"UniversalButton"}>
                                    <p>View on Roblox</p>
                                </div>
                            </a>
                        </li>)
                    // else
                    //     return <><p>Skipped</p></>
                })
            }

        </ul>
    </>
}