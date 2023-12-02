'use client'
import react from 'react'
import { SessionProvider } from 'next-auth/react'

export const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
export default Provider
