'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export const RoomSearchBar = () => {

    const params = useSearchParams()
    const router = useRouter()
    const [searchText, setSearchText] = useState(params.get("search") || "")


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (searchText) {
            router.push(`/rooms/?search=${searchText}`)
        }
    }

    const handleClear = () => {
        router.push("/rooms")
        setSearchText("")
    }

    return (
        <form onSubmit={handleSearch} className="flex md:flex-nowrap flex-wrap max-w-full md:w-[600px] items-center gap-4">
            <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search room by keyword such as typescript,python,etc.." />
            <Button aria-label="search-btn" type="submit"><Search className='mr-2 h-4 w-4' />Search</Button>
            {
                searchText &&
                <Button aria-label='clear-search' type="button" variant={"link"} onClick={handleClear}>Clear</Button>
            }
        </form>
    )
}
