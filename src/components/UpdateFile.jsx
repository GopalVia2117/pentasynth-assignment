import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { updateFile, updateFileInStore } from '@/redux/fetchFileSlice';

const UpdateFile = ({file}) => {
    const [name, setName] = useState(file?.name);
    const [description, setDescription] = useState(file?.description);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        try{
            const formData = new FormData();
            const id = file && file._id;
            formData.append("name", name);
            formData.append("description", description);
            dispatch(updateFile({id: id, form: formData})).then(data => {
                dispatch(updateFileInStore(data.payload));
            });

        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col">
            <label className="text-gray-400">Update File Name</label>
            <input onChange={(e) => setName(e.target.value)} className="border border-gray-300 hover:border-gray-400 p-2" type="text" value={name} placeholder="Update file name"/>
        </div>
        <div className="flex flex-col">
            <label className="text-gray-400">Update File Description</label>
            <input onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 hover:border-gray-400 p-2" type="text" value={description} placeholder="Update file description"/>
        </div>
        <div>
            <button onClick={handleUpdate} className="px-4 py-2 text-white bg-teal-500 hover:bg-teal-400" type="submit">Update</button>
        </div>
    </div>
  )
}

export default UpdateFile;