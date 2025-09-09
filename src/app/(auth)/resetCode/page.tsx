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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ResetCode() {
    const Route = useRouter()
    const SchemeForget = z.object({
        resetCode: z.string().nonempty("resetCode Required"),
    })
    const ForgetForm = useForm<z.infer<typeof SchemeForget>>({
        defaultValues: {
            resetCode: "",
        },
        resolver: zodResolver(SchemeForget)
    })


    async function handleVerifyCode(values: z.infer<typeof SchemeForget>) {

        console.log(values);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);

        if (data.status == 'Success') {

            Route.push("/resetPassword")
        } else {
            toast.error(data.message, { position: "top-center" })
        }

    }
    return (
        <div className='w-3/4 mx-auto my-5'>

            <Form {...ForgetForm}>

                <form onSubmit={ForgetForm.handleSubmit(handleVerifyCode)} className='space-y-3'>


                    <FormField
                        control={ForgetForm.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email:</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <Button className='bg-main rounded-3xl'>Verify Code</Button>
                </form>

            </Form>
        </div >
    )
}

