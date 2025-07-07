"use client"


// import React from 'react';
import { useEffect, useState } from 'react';
import Search from '../../components/Search';
import GameSearchContextProvider from '../../components/GameSearchContextProvider';
import SearchBlock from '../../components/SearchBlock';
import PaginatedGameList from '../../components/PaginatedGameList';
import MoreRequester from '../../components/MoreRequester';



export default function Page() {

    return (
        <>
            <div>
                Search page
            </div>
            <div>
                <GameSearchContextProvider>


                    <SearchBlock/>

                    <PaginatedGameList/>

                    <MoreRequester/>

                </GameSearchContextProvider>

            </div>
        </>
    );
}
