import { useSelector } from 'react-redux';
import React from 'react';

const FileDetails = () => {
  const file = useSelector(state => state.detailFile.file)
  return (
    <div className="bg-white rounded-md p-4 h-full border border-gray-300">
        <div className="flex justify-center items-center mb-4">
           { file?.type.split("/")[0] === "image" && <img className="block h-60 object-contain" src={file?.file_url}  /> }
           { file?.type.split("/")[1] === "pdf" && <embed className="block h-60 object-contain" src={file?.file_url} />}
           { file?.type.split("/")[0] === "video" && <video className="block h-60 object-contain" controls muted src={file?.file_url} /> }
        </div>

        <hr />
        <div className="mt-4">
            <table className="w-full">
            
            <tbody className="mt-2 text-sm"> 
                    <tr>
                        <td className="text-gray-400">File Name</td> 
                        <td>{file?.name}</td>
                    </tr>
                    <tr>
                        <td className="text-gray-400">File Description</td> 
                        <td>{file?.description.trim().length === 0 ? "No description provided": file?.description} </td>
                    </tr>
                    <tr>
                        <td className="text-gray-400">File Size</td> 
                        <td>{(file?.size / 1000000).toFixed(2)} MB</td>
                    </tr>

                    <tr>
                        <td className="text-gray-400">Upload Time</td> 
                        <td>{(file?.uploaded_at)}</td>
                    </tr>
               
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default FileDetails;