import React from 'react'
import CustomButton from './CustomButton'


const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          آپلود فایل
        </label>

        <p className="mt-2 text-gray-300 text-xs truncate">
          {file === '' ? "هیچ فایلی انتخاب نشده است!" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3" >
        <CustomButton 
          type="outline"
          title="لوگو"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton 
          type="filled"
          title="طرح کلی"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker