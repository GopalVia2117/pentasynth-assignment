import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Cancel } from '@mui/icons-material';

const Modal = ({children, visible, setVisible}) => {
  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', backdropFilter:'blur(15px)'}} className={`${visible ? 'flex' : 'hidden'} z-50 fixed top-0 left-0 justify-center items-center w-full h-screen`}>
        <div className="w-11/12 lg:w-1/2 h-max bg-white p-8 rounded-md shadow-md">
            <button onClick={() => setVisible(false)} className="block ml-auto z-50"><Cancel/></button>
            <div className="mt-4">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal;