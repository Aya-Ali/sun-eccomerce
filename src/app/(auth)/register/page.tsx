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

export default function Register() {
  const Route = useRouter()
  const SchemeRegister = z.object({
    name: z.string().nonempty("name Required").min(2, "min char 2").max(15, "max Char 15"),
    email: z.email("enter Valid Email").nonempty("Email Required"),
    password: z.string().nonempty("password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password Invalid"),
    rePassword: z.string().nonempty("Confirm Password Required"),
    phone: z.string().nonempty("phone Required").regex(/^(\+2)?01[0125][0-9]{8}$/,)
  }).refine((obj) => {
    return obj.password == obj.rePassword
  }, {
    path: ['rePassword'],
    error: "Confirm password mot Match"
  })
  const RegisterForm = useForm<z.infer<typeof SchemeRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(SchemeRegister)
  })


  async function handleRegister(values: z.infer<typeof SchemeRegister>) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json()
    if (data.message == 'success') {
      toast.success("Account Created ", { position: "top-center" })
      Route.push("/login")
    } else {
      toast.error(data.message, { position: "top-center" })
    }

  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Register Now</h1>
      <Form {...RegisterForm}>

        <form onSubmit={RegisterForm.handleSubmit(handleRegister)} className='space-y-3'>

          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Name:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
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
            control={RegisterForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel >password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Confirm Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel >phone:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />


          <Button className='bg-main rounded-3xl'>Register</Button>
        </form>

      </Form>
    </div >
  )
}

