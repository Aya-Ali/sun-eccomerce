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
export default function ForgetPassword() {
    const Route = useRouter()
    const SchemeForget = z.object({
        email: z.email("enter Valid Email").nonempty("Email Required"),
    })
    const ForgetForm = useForm<z.infer<typeof SchemeForget>>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(SchemeForget)
    })
    async function handleForgetPassword(values: z.infer<typeof SchemeForget>) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);

        if (data.statusMsg == 'success') {
           
            Route.push("/resetCode")
        } else {
            toast.error(data.message, { position: "top-center" })
        }

    }
    return (
        <div className='w-3/4 mx-auto my-5'>

            <Form {...ForgetForm}>

                <form onSubmit={ForgetForm.handleSubmit(handleForgetPassword)} className='space-y-3'>


                    <FormField
                        control={ForgetForm.control}
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



                    <Button className='bg-main rounded-3xl'>Send Email</Button>
                </form>

            </Form>
        </div >
    )
}

