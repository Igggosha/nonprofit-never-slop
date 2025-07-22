import { useContext } from 'react';
import GameSearchContext from './GameSearchContext';

export default function FilterSelectionForm()
{
    const {setSimpleFilters} = useContext(GameSearchContext)
    function SetFilters(e)
    {
        e.preventDefault()
        let formData = new FormData(e.target)
        let entries = Object.fromEntries(formData.entries())

        let filters = {}

        console.log(entries)

        if (entries.useMinPlayers && !isNaN(+entries.minPlayers))
        {
            filters.minPlayers = +entries.minPlayers
        }
        else filters.minPlayers = null

        console.log(entries.maxPlayers)
        console.log(+entries.maxPlayers)
        if (entries.useMaxPlayers && !isNaN(+entries.maxPlayers))
        {
            filters.maxPlayers = +entries.maxPlayers
        }
        else filters.maxPlayers = null

        if (entries.useMinVoteRatio && !isNaN(+entries.minVoteRatio))
        {
            filters.minVoteRatio = +entries.minVoteRatio
        }
        else filters.minVoteRatio = null

        if (entries.useMinMinAge && !isNaN(+entries.minMinAge))
        {
            filters.minMinAge = +entries.minMinAge
        }
        else filters.minMinAge = null

        if (entries.useMaxMinAge && !isNaN(+entries.maxMinAge))
        {
            filters.maxMinAge = +entries.maxMinAge
        }
        else filters.maxMinAge = null

        setSimpleFilters(filters)
    }
    return <>
        <form action="" onSubmit={SetFilters}>
            <p>Filters (Simple)</p>
            <br/>
            <label htmlFor={"useMinPlayers"}>Min Players</label>
            <input type={"checkbox"} name={"useMinPlayers"}/>
            <input type="text" name={'minPlayers'} id="" placeholder="0"/>
            <br/>
            <label htmlFor={"useMaxPlayers"}>Max Players</label>
            <input type={"checkbox"} name={"useMaxPlayers"}/>
            <input type="text" name={'maxPlayers'} id="" placeholder="∞"/>
            <br/>
            <label htmlFor={"useMinVoteRatio"}>Min Vote Ratio (%)</label>
            <input type={"checkbox"} name={"useMinVoteRatio"}/>
            <input type="text" name={'minVoteRatio'} id="" placeholder="0"/>
            <br/>
            <label htmlFor={"useMinMinAge"}>Min game age rating</label>
            <input type={"checkbox"} name={"useMinMinAge"}/>
            <input type="text" name={'minMinAge'} id="" placeholder="0"/>
            <br/>
            <label htmlFor={"useMaxMinAge"}>Max game age rating</label>
            <input type={"checkbox"} name={"useMaxMinAge"}/>
            <input type="text" name={'maxMinAge'} id="" placeholder="0"/>
            <br/>
            <button className="UniversalButton">Submit</button>

        </form>
    </>
}