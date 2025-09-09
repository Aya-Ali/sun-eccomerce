import Image from 'next/image'
import React from 'react'
import { Button } from 'src/components/ui/button'
import { productItem } from 'src/types/productDetails.type'
import ProductSlider from '../ProductSlider/ProductSlider'
import AddCartBtn from '../ProductCard/AddCartBtn'

export default function ProductDetailsCard({ product }: { product: productItem }) {
  const { title, price, ratingsAverage, _id, imageCover, category: { name }, description, images } = product
  return (

    <div className='w-4/5 mx-auto'>
      <div className='grid grid-cols-12 items-center gap-5'>
        <div className='col-span-4'>

          {/* <Image src={imageCover} alt={title} width={100} height={100} className='w-full rounded-2xl object-cover' /> */}
          <ProductSlider images={images} />
        </div>
        <div className='col-span-8'>
          <h1>{title}</h1>
          <p className='text-zinc-600 my-4'>{description}</p>
          <div className='flex justify-between items-center my-5'>
            <span>{price}EGP</span>
            <span><i className='fa-solid fa-star rating-color'></i>{ratingsAverage}</span>
          </div>

          <AddCartBtn id={_id} />
        </div>
      </div>
    </div>
  )
}
