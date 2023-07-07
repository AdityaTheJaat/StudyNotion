import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from "react-icons/fi"

const ImageUploader = () => {
  const {user} = useSelector((state) => state.profile);
  const imageBrowser = () => {

  }
  const imageUpload = () => {

  }
  return (
    <div className='flex gap-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
      <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover" />
      <div className='flex-row'>
        <p className="text-lg font-medium text-richblack-5 mb-1">Change Profile Picture</p>
        <div className='flex gap-5'>
          <IconBtn text="Select" onclick={imageBrowser} />
          <IconBtn text="Upload" onclick={imageUpload} ><FiUpload className="text-lg text-richblack-900" /></IconBtn>
        </div>
      </div>
    </div>
  )
}

export default ImageUploader