'use client'

import Image from 'next/image'
import errorPng from '../../public/icons/error.png'


const error = ({error}:{error:Error}) => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorPng} alt='' className='w-56 mb-8'/>
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">
          Well, this is embarrassing
        </h3>
        <div className="text-reg font-bold">{error.message}</div>
        <div className="mt-6 text-sm font-light">
          Error Code: 400
        </div>
      </div>
    </div>
    
  )
}
export default error