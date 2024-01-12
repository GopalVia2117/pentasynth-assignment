import { useSelector } from 'react-redux';
import React from 'react';

const MobileFileView = () => {
  const file = useSelector(state => state.detailFile.file)
  return (
    <div className="bg-white rounded-md p-4 h-full border border-gray-300">
        <div className="flex justify-center items-center mb-4">
        { file?.type.split("/")[0] === "image" && <img className="block h-60 object-contain" src={file?.file_url}  /> }
        { file?.type.split("/")[1] === "pdf" && <iframe className="block w-full h-60 object-contain" src={file?.file_url} />}
        { file?.type.split("/")[0] === "video" && <video className="block h-60 object-contain" controls muted src={file?.file_url} /> }
        </div>

        <hr />
        <div className="mt-4">
                    <div>
                        <p className="text-gray-400">File Name</p> 
                        <p>{file?.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">File Description</p> 
                        <p>{file?.description}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">File Size</p> 
                        <p>{(file?.size / 1000000).toFixed(2)} MB</p>
                    </div>

                    <div>
                        <p className="text-gray-400">Upload Time</p> 
                        <p>{(file?.uploaded_at)}</p>
                    </div>
        </div>
    </div>
  )
}

export default MobileFileView;