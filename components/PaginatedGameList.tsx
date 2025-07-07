import { useContext } from 'react';
import GameSearchContext from './GameSearchContext';


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
}

export default function PaginatedGameList()
{
    const {page, setPage, gameList , setGameList, latestResponse: JsonResponse, setLatestResponse} = useContext(GameSearchContext)

    return <>
        <p>Results:</p>
        <ul>
            {
                gameList.map((item: GameResult) => {
                    // console.log(item)
                    return <>
                        <li id={item.contents[0].contentId}>
                            <p>{item.contents[0].name }</p>
                            <br/>
                        </li>
                    </>
                })
            }

        </ul>
    </>
}