import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { DocumentDuplicateIcon, } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';

const OccupantPayRent = () => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    getActiveMethod()
  }, [])

  const getActiveMethod = async () => {
    setLoading(true)
    await axiosInstance.get(`active-payment-method`)
      .then(({ data }) => {
        setLoading(false)
        console.log("methods data", data)
        setData(data.data)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <>
      <Breadcrumb pageName="Pay Rent" />

      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-7">
          <div className="rounded p-4 shadow">

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white text-center">
                  Bank payment details
                </h3>
              </div>

              {loading && <Loader />}
              {!loading &&
                <div className="p-6.5">

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Bank
                    </label>
                    <div className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      {data.bank}
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Account Name
                    </label>
                    <div className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      {data.acc_name}
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Account number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={data.acc_number}
                    />
                  </div>

                  <button 
                    className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-4 xl:px-4"
                  >
                    <DocumentDuplicateIcon
                      // onClick={() => handleRemove(method.id)}
                      className='w-6 h-6 text-success'
                    />
                    Copy
                  </button>
                </div>
              }

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default OccupantPayRent