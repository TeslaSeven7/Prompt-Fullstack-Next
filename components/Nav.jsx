'use client'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'

export const Nav = () => {
  const userLoggedIn = false
  const { datat: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])
  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          src="/assets/img/logo.svg"
          className="object-contain"
          width={30}
          height={30}
          alt="logo"
        />
      </Link>
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut} type="button">
              Sign Out
            </button>
            <Link href="/profile" className="">
              <Image
                src="/assets/img/logo.svg"
                className="rounded-full"
                width={37}
                height={37}
                alt="profil-picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/img/logo.svg"
              className="rounded-full"
              width={37}
              height={37}
              alt="profil-picture"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown ? (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => {
                    setToggleDropDown(false)
                  }}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => {
                    setToggleDropDown(false)
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  className="black_btn"
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                >
                  Signout
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}
export default Nav
