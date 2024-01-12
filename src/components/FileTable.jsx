"use client"

import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '@/redux/fetchFileSlice';
import { deleteFile, deleteFileInStore } from '@/redux/fetchFileSlice';
import { setDetailedFile } from '@/redux/detailFileSlice';

import { Delete, Edit } from '@mui/icons-material';
import { PictureAsPdf, PhotoAlbum } from '@mui/icons-material';
import Modal from './Modal';
import UpdateFile from './UpdateFile';
import MobileFileView from './MobileFileView';

const FileTable = () => {
  const files = useSelector(state => state.files.files);
  const dispatch = useDispatch();
  const [component, setComponent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(files);
    dispatch(fetchFiles());
  }, []);

  const handleClick = (file) => {
    dispatch(setDetailedFile(file))

    if(window.innerWidth <= 480){
      setComponent(<MobileFileView file={file} />);
      setVisible(true);
    }
  }

  const handleDelete = (file) => {
    dispatch(deleteFile(file._id)).then(data => {
      dispatch(deleteFileInStore(file));
    });
  }

  const handleEditClick = (file) => {
    setComponent(<UpdateFile file={file}/>);
    setVisible(true);
  }

  return (
    <div className="w-full text-sm lg:text-base bg-white rounded-md p-4 h-full border border-gray-300">
        <table className="w-full">
            <thead className="border-b border-gray-200 py-1 text-gray-700">
                <tr><th>File Name</th> <th>File Size</th> <th>Upload Time</th> <th>Actions</th></tr>
            </thead>
            <tbody className="text-center mt-2 whitespace-break-spaces">
                {files?.map((file, index) => (
                    <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                        <td className="lg:hidden text-start" onClick={() => handleClick(file)}>{file.type.split("/")[1] === "pdf" ? <span className='text-red-500'><PictureAsPdf/></span>  : <span className="text-blue-400"><PhotoAlbum/></span>} {file?.name?.substr(0, 6)}...</td> 
                        <td className="hidden lg:inline-block text-start" onClick={() => handleClick(file)}>{file.type.split("/")[1] === "pdf" ? <span className='text-red-500'><PictureAsPdf/></span> :<span className="text-blue-400"><PhotoAlbum/></span>} {file?.name}</td> 
                        <td>{(file?.size / 1000000).toFixed(2)} MB</td> {/* convert file size into MB */}
                        <td>{file?.uploaded_at}</td>
                        <td className="flex gap-2 justify-center">
                            <span onClick={() => handleEditClick(file)} className="text-yellow-500 hover:text-yellow-400"><Edit/></span>
                            <span onClick={() => handleDelete(file)} className="text-red-500 hover:text-red-400"><Delete/></span>
                        </td>
                    </tr>))}
            </tbody>
        </table>

        <Modal visible={visible} setVisible={setVisible}>
            {component}
        </Modal>
    </div>
  )
}

export default FileTable