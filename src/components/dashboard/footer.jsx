import React from 'react';
import { MdKeyboardArrowUp } from "react-icons/md";

const DashboardFooter = () => {
  return (
    <footer className='bg-dashclr sticky bottom-0 flex justify-between items-center md:px-5 p-1 text-xs w-full'>
        <p>Do studio</p>
        <MdKeyboardArrowUp className='text-xl cursor-pointer'/>
    </footer>
  )
}

export default DashboardFooter