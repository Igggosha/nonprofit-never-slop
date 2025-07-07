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

        setSimpleFilters(filters)
    }
    return <>
        <form action="" onSubmit={SetFilters}>
            <p>Filters (Simple)</p>
            <br/>
            <label htmlFor={"useMinPlayers"}>Use Min Players</label>
            <input type={"checkbox"} name={"useMinPlayers"}/>
            <input type="text" name={'minPlayers'} id="" placeholder="0"/>
            <br/>
            <label htmlFor={"useMaxPlayers"}>Use Max Players</label>
            <input type={"checkbox"} name={"useMaxPlayers"}/>
            <input type="text" name={'maxPlayers'} id="" placeholder="∞"/>
            <br/>
            <button className="UniversalButton">Submit</button>

        </form>
    </>
}