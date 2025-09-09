'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { cashOrder, checkoutPaymenet } from 'src/OrderAction/OrderAction'

export default function Checkoutsession() {
  const { cartId }: { cartId: string } = useParams()
  const Router = useRouter()

  const shippingForm = useForm({
    defaultValues: {
      "details": "",
      "phone": "",
      "city": ""
    }
  })

  async function checkoutSessionPayment(values: { details: string, phone: string, city: string }) {
    const data = await checkoutPaymenet(cartId, values)
    console.log(data);
    // window.location.href = data.session.url
    window.open(data.session.url, "_blank")
  }
  async function cashOrderPayment(values: { details: string, phone: string, city: string }) {
    const data = await cashOrder(cartId, values)
    console.log(data);

    Router.push("/allorders")
  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl'>Check Out Payment</h1>
      <Form {...shippingForm}>
        <form className="space-y-1">
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button onClick={shippingForm.handleSubmit(checkoutSessionPayment)}>Payment</Button>
          <Button onClick={shippingForm.handleSubmit(cashOrderPayment)}>cashOrder</Button>

        </form>
      </Form>
    </div>
  )
}
