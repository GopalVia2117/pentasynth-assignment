import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-full bg-white rounded-md border border-gray-300 p-4 h-full flex flex-col gap-2">
        <div><p className="text-gray-400">Description</p></div>
        <hr/>
        <p>This project is developed as an assignment for the Web Development Internship At
        PetroSynth Private Limited
        </p>
        <hr/>
        <p className="text-gray-400">Tech Stack</p>
        <ul className="list-disc px-4">
            <li>CRUD Operations for File Management using Flask Framework.</li>
            <li>Next framework which is builit on top of React library for frontend implementation.</li>
            <li>State Management Using Redux.</li>
            <li>Used cloudinary for storing files on cloud.</li>
            <li>Used MongoDB to store file metadata (e.g., file name, size, upload date, description).</li>
        </ul>
    </div>
  )
}

export default Sidebar;