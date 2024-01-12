import React, { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import Link from 'next/link';
import { searchFile, clearSearchedFiles } from '@/redux/searchFileSlice';
import { setDetailedFile } from '@/redux/detailFileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoAlbum, PictureAsPdf } from '@mui/icons-material';

const Searchbar = () => {
    const searchedFiles = useSelector(state => state.search.searchedFiles);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        if(search.length > 0){
            dispatch(searchFile(search));
        }
    }, [search]);

    const handleBlur = () => {
        if(search.length === 0){
            dispatch(clearSearchedFiles());
        }
    }
  return (
    <div className='relative'>
        <div className="w-0 lg:w-96 hover:outline-[1px] hover:outline hover:outline-gray-500  flex items-center rounded-md px-4 bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">
            <Search/>
            <input onBlur={handleBlur} onChange={(e) => setSearch(e.target.value)} className="w-full inline-block bg-gray-100 px-2 py-2 rounded-md outline-none" type="search" />
        </div>
        {search && 
        <div className="absolute bg-white w-full px-4 py-2 border border-gray-300 rounded-md mt-1">
            {searchedFiles.map((file, index) => {
                return <div key={index} className="cursor-pointer" onClick={() => dispatch(setDetailedFile(file))}><p className="px-2 py-1 hover:bg-gray-100">{file.type.split("/")[1] === "pdf" ? <span className='text-red-500'><PictureAsPdf/></span>  : <span className="text-blue-400"><PhotoAlbum/></span>} {file.name}</p></div>
            })}  
        </div>
        }
    </div>
  )
}

export default Searchbar