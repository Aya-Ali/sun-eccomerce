'use client'
import { useContext } from "react"
import Link from "next/link"
import {
    NavigationMenu,

    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,

    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { cn } from "src/lib/utils"
import { CountContext } from "../../../CountProvider"



export default function Navbar() {
    const { data, status } = useSession()
    const pathName: string = usePathname()

    const countData = useContext(CountContext)

    const menuItem: { path: string, content: string, protected: boolean }[] = [
        { path: "/products", content: "Products", protected: false },
        { path: "/category", content: "category", protected: false },
        { path: "/brands", content: "brands", protected: false },
        { path: "/wishlist", content: "wishlist", protected: false },
        // { path: "/cart", content: "cart", protected: true },
        { path: "/allorders", content: "orders", protected: true },
    ]
    const menuAuthItem: { path: string, content: string }[] = [
        { path: "/login", content: "login" },
        { path: "/register", content: "reigster" },

    ]

    function logout() {
        signOut({
            callbackUrl: '/login'
        })
    }
    return (
        <NavigationMenu className="max-w-full justify-between p-5 shadow-2xl" viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem >
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href='/'>
                            <Image src={'/images/freshcart-logo.svg'} alt="logo" width={100} height={100} />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>



                {
                    menuItem.map((item) => {

                        return <NavigationMenuItem key={item.path}>


                            {item.protected && status == 'authenticated' && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className={pathName == item.path ? 'text-main' : ""} href={item.path}>{item.content}</Link>
                            </NavigationMenuLink>}


                            {!item.protected && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className={pathName == item.path ? 'text-main' : ""} href={item.path}>{item.content}</Link>
                            </NavigationMenuLink>}




                        </NavigationMenuItem>




                    })
                }
                {
                    status == 'authenticated' && <NavigationMenuItem>

                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle())}>
                            <Link className='relative' href='/cart'>Cart

                                <span className="absolute -top-0.5 -right-0.5 bg-red-400 w-5 h-5 rounded-full flex justify-center items-center">{countData?.count}</span>
                            </Link>

                        </NavigationMenuLink>
                    </NavigationMenuItem>
                }

            </NavigationMenuList>
            <NavigationMenuList>
                {status == 'authenticated' ? <>


                    <NavigationMenuItem >
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span className="bg-red-400 p-5">hello {data?.user.name}</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem >
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span onClick={logout}>Logout</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </>
                    : <>

                        {
                            menuAuthItem.map((item) => {
                                return <NavigationMenuItem key={item.path}>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href={item.path}>{item.content}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            })
                        }

                    </>}


            </NavigationMenuList>
        </NavigationMenu>
    )
}

