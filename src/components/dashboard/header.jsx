"use client"
import React from 'react';
import { usePathname } from "next/navigation";
import { logout } from "../../app/utils/action"
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const DashboardHeader = () => {
  const pathname = usePathname();
  return (
    <nav className='bg-dashclr sticky top-0 m-5 flex justify-between items-center p-5'>
      <p>{pathname.split('/').pop()}</p>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="cursor-pointer"><HiOutlineMenuAlt3 className='text-2xl'/></div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-40">
          <li>
            <form action={logout} className='flex items-center justify-between'>
              <button>Logout</button>
              <IoMdLogOut className='text-xl'/>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default DashboardHeader