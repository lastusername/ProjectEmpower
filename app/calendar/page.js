"use client"
 
import React, { useEffect, useState } from "react"
 
import { Calendar } from "@/components/ui/calendar"
 
export default function CalendarDemo() {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    console.log(date)
  }, [date])
 
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}