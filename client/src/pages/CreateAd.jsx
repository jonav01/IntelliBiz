import React from 'react'
import Navbar from '../components/Navbar'
import TextArea from '../components/TextArea'
function CreateAd() {
  return (
    <div>
        <Navbar />
        <div className='bg-slate-200 p-2 xl:p-10 lg:p-10 md:p-4 sm:p-2'>
            <TextArea />
        </div>
    </div>
  )
}

export default CreateAd