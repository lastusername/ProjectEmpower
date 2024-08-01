"use client"

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './togglebutton'

const Navbar = () => {
  return (
    <div className='w-screen flex items-center justify-between p-5 fixed top-0'>
        <h1 className='text-2xl underline decoration-blue-500 -rotate-2'>Connect</h1>
        <div className='flex gap-5 items-center'>
            <Link href="/forum">Forum</Link>
            <Link href="/calendar">Calendar</Link>
            <ModeToggle />
        </div>
    </div>
  )
}

export default Navbar