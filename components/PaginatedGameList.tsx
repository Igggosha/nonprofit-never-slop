import { useCallback, useContext, useEffect, useState } from 'react';
import GameSearchContext from './GameSearchContext';
import Image from 'next/image';
import GetImages from './GetImages';




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

function SponsoredBar( props : {isSponsored: boolean})
{
    if (props.isSponsored)
    {
        return <>
            <br/>
            <b className={"text-red-900"}>{"WARNING! THIS GAME IS 'SPONSORED'."}</b>
        </>
    }
}

function GameBlock(props: {game: GameData, imageLink: string})
{
    let game: GameData = props.game
    let imageLink: string = props.imageLink

    return (
        <li key={game.contentId} className={"GameListItem"}>
            <h3>{game.name}</h3>
            <br/>
            <p>Current players: <em>{game.playerCount}</em></p>
            <p>Upvotes: <b className={"text-lime-500"}>{game.totalUpVotes}</b></p>
            <p>Downvotes: <b className={"text-red-900"}>{game.totalDownVotes}</b></p>
            <p>Ratio: <b>{Math.round(game.totalUpVotes / (game.totalUpVotes + game.totalDownVotes) * 100)}%</b></p>

            {
                (imageLink != undefined && imageLink != "") ?
                    <Image src={imageLink} alt={""} width={0} height={0} sizes={'100%'} style={{width: '100%', height:'auto'}}/>
                    :
                    <p>Loading image...</p>
            }

            <SponsoredBar isSponsored={game.isSponsored}/>



            <br/>
            <hr/>
            <br/>
            <a href={`https://roblox.com/games/${game.rootPlaceId}`}>
                <div className={"UniversalButton"}>
                    <p>View on Roblox</p>
                </div>
            </a>
        </li>)
}

export default function PaginatedGameList()
{
    const {page, setPage, gameList , setGameList, latestResponse, setLatestResponse, simpleFilters, setSimpleFilters, gameIds, setGameIds} = useContext(GameSearchContext)

    const [gameImages, setGameImages] = useState({} as {string: string});

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

    useEffect(() => {
        async function getImages()
        {

            let result = await GetImages(gameIds)
            result.data.forEach(item => {
                // @ts-ignore
                setGameImages(im => {
                    let value = item.imageUrl
                    return {
                        ...im, [item.targetId]: value
                    }
                })
            })
            console.log(gameImages)
        }
        getImages()
    }, [gameIds]);

    // yeah, I like <br/> tags, how'd you know

    return <>
        <p>Results:</p>
        <ul className={"GameListHolder"}>
            {
                gameList.map((item: GameResult) => {
                    // console.log(item)
                    if (gamePassesFilters(item.contents[0]))
                    return (
                        //@ts-ignore
                        <GameBlock game={item.contents[0]} key={item.contents[0].contentId} imageLink={gameImages[item.contents[0].contentId]}/>
                       )
                    // else
                    //     return <><p>Skipped</p></>
                })
            }

        </ul>
    </>
}