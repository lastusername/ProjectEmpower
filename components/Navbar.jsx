"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './togglebutton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { push, ref, set, get } from "firebase/database"
import { database } from '@/firebase';
import { UserAuth } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    console.log(format(date, "MMM d y"))
  }, [date])
  const { toast } = useToast()

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const { logout, user } = UserAuth()
  const hour = []
  for (let i = 1; i <= 12; i++) {
    const formattedNumber = i.toString().padStart(2, '0');
    hour.push(formattedNumber);
  }

  const minute = []
  for (let i = 0; i <= 60; i++) {
    const formattedNumber = i.toString().padStart(2, '0');
    minute.push(formattedNumber);
  }

  const handleSubmit = () => {
    const startSplit = start.split(":")
    console.log(startSplit)
    const endSplit = end.split(":")
    if (!hour.includes(startSplit[0]) || !hour.includes(endSplit[0]) || !minute.includes(startSplit[1]) || !minute.includes(endSplit[1])) {
      return (
        toast({
          variant: "destructive",
          title: "Error",
          description: "Your time is not inputted correcrly",
        })
      )
    }
    const eventRef = ref(database, "event")
    const newEventRef = push(eventRef)
    set(newEventRef, {
      title: title,
      description: desc,
      city: city,
      state: state,
      date: format(date, "MMM d y"),
      startTime: start,
      endTime: end
    }).then(() => {
      return (
        toast({
          variant: "success",
          title: "Success",
          description: "You successfully uploaded an event!",
        })
      )
    })
  }

  const handleLogout = async () => {
    try {
      await logout().then(() => {
        router.push("/")
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='w-screen flex items-center justify-between p-5 fixed top-0'>
      <Link href="/"><h1 className='text-2xl underline decoration-blue-500 -rotate-2 select-none'>Connect</h1></Link>
      <div className='flex gap-5 items-center'>
        {user && <div className="flex gap-5 items-center">
          <Link href="/forum">Forum</Link>
          <Link href="/calendar">Calendar</Link>
          <Dialog>
            <DialogTrigger>Create Event</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription>
                  <div className='flex flex-col gap-y-4'>
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea className="max-h-60" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant={"outline"}
                          className=
                          "w-full pl-3 text-left font-normal"
                        >
                          <span>{date ? format(date, "MMM d y") : "Pick a date"}</span>
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <div className='flex gap-2'>
                      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                      <Select onValueChange={(state) => setState(state)}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="DC">District Of Columbia</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='flex gap-2'>
                      <Input placeholder="Time start (HH:MM)" value={start} onChange={(e) => setStart(e.target.value)} />
                      <Input placeholder="Time end (HH:MM)" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>}
        {!user && <div className='flex gap-5'>
          <Button onClick={() => router.push("/signup")} variant="outline">Signup</Button>
          <Button onClick={() => router.push("/login")} variant="outline">Login</Button>
          </div>}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar