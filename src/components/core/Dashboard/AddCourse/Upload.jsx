import React from 'react'

const Upload = ({name, label, register, setValue, errors, editData = null, video = false, viewData = null}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <button type='file'>Add</button>
    </div>
  )
}

export default Upload