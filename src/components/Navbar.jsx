"use client"
import React, {useState} from 'react';
import Modal from './Modal';
import FileUpload from './FileUpload';
import { Search } from '@mui/icons-material';
import Searchbar from './Searchbar';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
        <header className="px-8 py-4 border-b border-gray-300">
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-red-500 text-xl">File Manager</h1>
                <Searchbar/>
                <button onClick={() => setVisible(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-sm text-white block">Upload New File</button>
            </div>
        </header>
        <Modal visible={visible} setVisible={setVisible}>
            <FileUpload/>
        </Modal>
    </>
  )
}

export default Navbar;