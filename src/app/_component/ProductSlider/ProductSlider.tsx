
'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({ images }: { images: string[] }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000
    };
    return (

        <Slider {...settings}>

            {images.map((image) => {
                return <div key={image}>
                    <Image src={image} alt="img1" width={1000} height={1000} className="w-full " />
                </div>
            })}


        </Slider>


    );
}
