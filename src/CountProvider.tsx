'use client'
import React, { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./CartAction/CartAction";
import { CartData } from "./types/cart.type";


type ContextType = {
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export const CountContext = createContext<ContextType | null>(null)

export default function CountProvider({ children }: { children: React.ReactNode }) {


    const [count, setCount] = useState<number>(0)


    async function getCart() {
        const token: unknown = await getUserToken()
        if (token) {
            const data: CartData = await getCartData()

            const sum = data.data.products.reduce((total, item) => total += item.count, 0)

            setCount(sum)
        }

    }
    useEffect(() => {
        getCart()
    })


    return <CountContext.Provider value={{ count, setCount }}>
        {children}
    </CountContext.Provider>
}

// login , refresh ,update count , delete , clear ,add