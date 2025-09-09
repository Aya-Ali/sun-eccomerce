import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image.js'
import { product } from 'src/types/product.type';
import Link from 'next/link';
import AddCartBtn from './AddCartBtn';

export default function ProductCard({ product }: { product: product }) {
    const { title, price, ratingsAverage, _id, imageCover, category: { name } } = product
    return (
        <Card className='bg-gray-300'>
            <Link href={'/products/' + _id}>


                <CardHeader>
                    <Image src={imageCover} alt={title} width={100} height={100} className='w-full rounded-2xl object-cover' />

                </CardHeader>
                <CardContent>
                    <h5 className='text-main'>{name}</h5>
                    <CardTitle>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>


                    <div className='flex justify-between items-center'>
                        <span>{price}EGP</span>
                        <span><i className='fa-solid fa-star rating-color'></i>{ratingsAverage}</span>
                    </div>
                </CardContent>
            </Link>
            <CardFooter>
                <AddCartBtn id={_id} />
            </CardFooter>
        </Card>
    )
}
