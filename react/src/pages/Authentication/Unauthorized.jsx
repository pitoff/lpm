import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { BackwardIcon } from "@heroicons/react/20/solid"

const Unauthorized = () => {
    
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <section className='my-32' id='unauthorized'>
      <div className="conatiner-fluid mx-auto flex flex-col grid justify-items-center">
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Unauthorized access</h1>
        <p>Whoops!... Something went wrong</p>
        <p>Please you Don't have access to this resource...</p>
      </div>

      <div className="container-fluid mx-auto mt-6 grid justify-items-center">
        <button
          type="button"
          onClick={goBack}
          className="group relative bg-secondary flex w-32 rounded-md bg-pink-500 py-2 px-3 grid justify-items-center text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {/* <BackwardIcon className="h-5 w-5 group-hover:text-indigo-400" aria-hidden="true" /> */}
          </span>
          Go Back
        </button>
      </div>
    </section>
  )
}

export default Unauthorized