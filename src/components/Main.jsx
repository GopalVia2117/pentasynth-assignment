import React from 'react'
import { ToastContainer } from 'react-toastify';

const Main = ({children}) => {
  return (
    <main className="w-full h-[90vh] bg-gray-100 flex p-8 gap-4">
      {children}
    </main>
  )
}

export default Main;