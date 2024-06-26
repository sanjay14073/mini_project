import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  let [name,setName]=useState("")
  useEffect(()=>{
    setName(currentUser.username)
  },)
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
      Welcome {name==="ramangoudanh"?"Admin":"User"} !
      </h1>

      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
        Welcome to my complaint App!
      </h1>
      <p className='mb-4 text-slate-700'>
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className='mb-4 text-slate-700'>
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
  
    </div>
  );
}