"use client";

import React, { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { push, ref, set, get } from "firebase/database";
import { database } from "@/firebase";

export default function CalendarDemo() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log(date);
    const fetchEvents = async () => {
      const eventsRef = ref(database, "event");
      get(eventsRef).then((snapshot) => {
        if (snapshot.exists() && date) {
          const eventsArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          console.log(format(date, "MMM d y"))
          var filteredEventsArray = []
          eventsArray.map((event) => {
            if (event.date === format(date, "MMM d y")) {
              filteredEventsArray.push(event)
            }
          })
          setEvents(filteredEventsArray);
          console.log(filteredEventsArray)
        }

        else {
          setEvents();
        }
      });
    };
    fetchEvents();
  }, [date]);

  return (
    <div>
      <div className="">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-y-3 mt-5">
        {events?.map((event, index) => (
          <div key={index} className="bg-blue-500 p-3 rounded-sm">
            <h1 className="text-2xl">{event.title}</h1>
            <p>{event.description}</p>
            <p className="text-sm">{event.city}, {event.state}</p>
            <p>{event.startTime} - {event.endTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
