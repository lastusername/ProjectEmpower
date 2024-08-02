"use client"

import Link from 'next/link'
import React from 'react'
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
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"

/*export function CalendarForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  } */

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
                
                  <Form>
      <form className="space-y-8">
        <FormField
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
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