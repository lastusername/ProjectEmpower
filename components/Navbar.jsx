"use client"

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './togglebutton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"


const Navbar = () => {
  return (
    <div className='w-screen flex items-center justify-between p-5 fixed top-0'>
      <h1 className='text-2xl underline decoration-blue-500 -rotate-2'>Connect</h1>
      <div className='flex gap-5 items-center'>
        <Link href="/forum">Forum</Link>
        <Link href="/calendar">Calendar</Link>
        <Dialog>
          <DialogTrigger>Create Event</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription>
                <div className='flex flex-col gap-y-4'>
                  <Input placeholder="Title"/>
                  <Textarea  className = "max-h-60" placeholder="Description"/>
                  <Input />
                  <Input />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar