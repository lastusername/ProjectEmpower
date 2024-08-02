"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './togglebutton'
import { cn } from "@/lib/utils"

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
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const Navbar = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    console.log(format(date, "MMM d Y"))
  }, [date])

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
                  <Input placeholder="Title" />
                  <Textarea className="max-h-60" placeholder="Description" />
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant={"outline"}
                        className=
                        "w-[240px] pl-3 text-left font-normal"

                      >
                        <span>{date ? format(date, "MMM d Y") : "Pick a date"}</span>
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
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