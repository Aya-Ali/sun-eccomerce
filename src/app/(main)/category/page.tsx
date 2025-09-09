import { getServerSession } from 'next-auth'
import React from 'react'
import { NextOptions } from 'src/app/api/auth/[...nextauth]/route'

export default async function page() {
  const data = await getServerSession(NextOptions)
  console.log(data?.user);

  return (
    <div>page</div>
  )
}
