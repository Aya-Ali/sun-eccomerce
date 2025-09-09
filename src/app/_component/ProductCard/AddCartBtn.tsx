'use client'

import { useContext } from 'react'
import { toast } from 'sonner'
import { AddProductToCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'
export default function AddCartBtn({ id }: { id: string }) {

    const countData = useContext(CountContext)
    async function addProduct(id: string) {

        try {
            const data = await AddProductToCart(id)
            console.log(data);

            if (data.status == 'success') {
                toast.success(data.message, { position: "top-center" })
                const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0)

                countData?.setCount(sum)
            } else {
                toast.error("Incorrect Id", { position: "top-center" })
            }
        } catch (err) {
            toast.error("Cant add product to cart without login!", { position: "top-center" })

        }

    }

    return (
        <Button onClick={() => addProduct(id)} className='bg-main w-full rounded-3xl cursor-pointer' >Add To Cart</Button>

    )
}
