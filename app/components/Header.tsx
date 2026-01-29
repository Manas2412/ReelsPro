"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"


const Header = () => {
    const { data: session } = useSession()

    const handleSignout = async () => {
        try {
            await signOut()
        } catch (err) {
            console.error("Signout error:", err)
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Reels Pro</Link>
            </div>
            <div className="flex-none gap-2">
                {session ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={`https://ui-avatars.com/api/?name=${session.user?.email || "User"}`} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link href="/upload">Upload</Link>
                            </li>
                            <li><button onClick={handleSignout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/login" className="btn btn-primary">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Header