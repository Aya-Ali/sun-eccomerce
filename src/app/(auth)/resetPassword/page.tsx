'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPassword() {
    const Route = useRouter()
    const SchemeReset = z.object({
        email: z.email("enter Valid Email").nonempty("Email Required"),
        newPassword: z.string().nonempty("newPassword").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password Invalid"),
    })
    const ResetForm = useForm<z.infer<typeof SchemeReset>>({
        defaultValues: {
            email: "",
            newPassword: "",

        },
        resolver: zodResolver(SchemeReset)
    })


    async function handleResetPassword(values: z.infer<typeof SchemeReset>) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);

        if (data.token) {
      
          Route.push("/login")
        } else {
          toast.error(data.message, { position: "top-center" })
        }

    }
    return (
        <div className='w-3/4 mx-auto my-5'>
            <h1 className='text-3xl my-5'>Reset Password Now</h1>
            <Form {...ResetForm}>

                <form onSubmit={ResetForm.handleSubmit(handleResetPassword)} className='space-y-3'>


                    <FormField
                        control={ResetForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email:</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={ResetForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >New password:</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                 
                    <Button className='bg-main rounded-3xl'>Reset</Button>
                </form>

            </Form>
        </div >
    )
}

