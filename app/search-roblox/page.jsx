"use client"


// import React from 'react';
import { useEffect, useState } from 'react';
import Search from '../../components/Search';



export default function Page() {
    const [response, setResponse] = useState("");
    const [query, setQuery] = useState("");
    useEffect(() => {
        async function getData()
        {
            console.log(query)
            if (query != "")
            {
                console.log("fetching")
                let json = await Search(query)

                console.log(json)
                setResponse(toString(json))
            }
        }

        getData()

    }, [query]);

    function SubmitForm(e)
    {
        e.preventDefault()
        let formData = new FormData(e.target)
        let entries = Object.fromEntries(formData.entries())

        setQuery(entries.query)
    }
    return (
        <>
            <div>
                Search page
            </div>
            <div>
                <form action="" onSubmit={SubmitForm}>
                    <label htmlFor="query"></label> <input type="text" placeholder="Search Query" name="query"/>
                    <input type="submit" value="Send Terry Davis agents" className={"rounded-md flex items-center bg-blue-400 text-white border border-transparent py-2 px-4 text-center text-sm transition-all hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"}/>
                </form>

                <p>
                    {response}
                </p>

            </div>
        </>
    );
}
