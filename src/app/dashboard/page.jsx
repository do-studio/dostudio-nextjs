import React from 'react';
import {  getSession } from "../utils/action";
import { redirect } from "next/navigation";


const Dashboard = async () => {
  // const session = await getSession();

  // if(!session.isLoggedIn){
  //   redirect("/")
  // }

  return (
    <main className='w-full h-[200vh] px-5'>
      Dashboard
    </main>
  )
}

export default Dashboard