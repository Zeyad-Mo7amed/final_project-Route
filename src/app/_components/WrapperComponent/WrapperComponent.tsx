'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function WrapperComponent({children}:{children:ReactNode}) {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  )
}
