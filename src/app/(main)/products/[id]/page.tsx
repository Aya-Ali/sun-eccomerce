import React from 'react'
import { ProductDetails, productItem } from 'src/types/productDetails.type';
import ProductDetailsCard from './../../../_component/ProductDetailsCard/ProductDetailsCard';

export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data: ProductDetails = await res.json()
    const product: productItem = data.data
    return (
        <div>


            <ProductDetailsCard  product={product}/>
        </div>
    )
}
