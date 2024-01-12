"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

import { uploadFile } from '@/redux/uploadSlice';
import { addFile } from '@/redux/fetchFileSlice';

import { Cancel } from '@mui/icons-material';
import { UploadFile as FileIcon } from '@mui/icons-material';


const FileUpload = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState("");

  useEffect(() => {
    if(file){
        const url = URL.createObjectURL(file);
        setSrc(url);

        console.log(file.type);
    }
  }, [file]);


  const reset = () => {
    setDescription("");
    setFile(null);
  }


  const handleSubmit = () => {
    try {
      if(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("size", file.size);
        formData.append("type", file.type);
        formData.append("description", description);
        dispatch(uploadFile(formData)).then(data => {
          dispatch(addFile(data.payload));
        });
        reset();
      }
      else{
        toast.error("Please select a file!!!", {autoClose: 2000})
      }
    } catch (error) {
      consolelog(error);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center gap-2 lg:gap-4 mt-12 lg:mt-0 h-[500px] lg:h-80  lg:max-h-80">
        <div className="relative w-full lg:w-1/2 flex justify-center items-center border border-dashed border-gray-400 p-4 h-80 font-medium text-xl rounded-md">
            {file && <button onClick={() => setFile(null)} className="absolute left-2 top-2 z-50"><Cancel/></button> }


            {file && (file?.type.split("/")[0] === "image" || file?.type.split("/")[1] === "pdf") && 
              <iframe src={src} className="flex justify-center items-center w-full h-full" /> }
            {
              file && file?.type.split("/")[0] === "video" &&
              <video src={src} controls muted className='w-full h-auto' />
            }
            
            {!file && 
                <div onClick={() => ref.current.click()} className="flex flex-col items-center justify-center cursor-pointer">
                    <span className="text-2xl text-blue-500"><FileIcon fontSize="large"/></span>
                    <span className="font-medium text-sm mt-2">CHOOSE FILE TO UPLOAD</span>
                </div>
            }
        </div>
        <div className="w-1 border-l border-dashed border-gray-300 h-full"/>
        <div className="w-full lg:w-1/2 flex justify-between items-center flex-col gap-2">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={10} className="p-2 border border-gray-200 w-full outline-none focus:border-gray-400 rounded-md" placeholder="Write file description here...."></textarea>
            <input className="hidden mx-auto w-max" onChange={(e) => {setFile(e.target.files[0]); e.target.value=""}} ref={ref} type="file" />
            <button onClick={handleSubmit} className="block mx-auto px-4 py-2 mt-2 bg-teal-500 hover:bg-teal-400 rounded-sm text-white">Upload</button>
        </div>
    </div>
  )
}

export default FileUpload;


// <div onDragOver={(e) => {e.target.classList.add("border-green-300")}}  className="flex justify-center items-center border border-dashed border-gray-400 p-4 h-60 font-medium text-xl before:content-none before:border-dashed before:border before:border-gray-400">
//             Drag & Drop
//         </div>
//         <div className="border border-dashed  border-gray-200 p-2 w-max rounded-full mt-2 mx-auto">
//         or
//         </div>