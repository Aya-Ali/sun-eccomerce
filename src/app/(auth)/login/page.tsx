'use client'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getUserToken } from 'src/getUserToken'
import { getCartData } from 'src/CartAction/CartAction'
import { CartData } from 'src/types/cart.type'
import { CountContext } from 'src/CountProvider'

export default function Login() {
  const Route = useRouter()
  const CountData = useContext(CountContext)
  const SchemeLogin = z.object({
    email: z.email("enter Valid Email").nonempty("Email Required"),
    password: z.string().nonempty("password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password Invalid"),
  })
  const LoginForm = useForm<z.infer<typeof SchemeLogin>>({
    defaultValues: {
      email: "",
      password: "",

    },
    resolver: zodResolver(SchemeLogin)
  })


  async function handleLogin(values: z.infer<typeof SchemeLogin>) {


    const data = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: '/'
    })
    if (data?.ok) {
      toast.success("Login Succe ", { position: "top-center" })
      const token = await getUserToken()
      if (token) {
        const data: CartData = await getCartData()

        const sum = data.data.products.reduce((total, item) => total += item.count, 0)

        CountData?.setCount(sum)
      }
      Route.push("/")
    } else {
      toast.error(data?.error, { position: "top-center" })
    }

    console.log(data);

    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    // const data = await res.json()
    // if (data.message == 'success') {
    //   toast.success("Login Succe ", { position: "top-center" })
    //   Route.push("/")
    // } else {
    //   toast.error(data.message, { position: "top-center" })
    // }

  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Register Now</h1>
      <Form {...LoginForm}>

        <form onSubmit={LoginForm.handleSubmit(handleLogin)} className='space-y-3'>


          <FormField
            control={LoginForm.control}
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
            control={LoginForm.control}
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


          <Link href='/forgetPassword'>ForgetPassword???????</Link>
          <br />
          <Button className='bg-main rounded-3xl'>login</Button>
        </form>

      </Form>
    </div >
  )
}

