import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import axiosInstance from '../../axios';
import { ReceiptPercentIcon, PrinterIcon, EyeIcon, ListBulletIcon, CreditCardIcon, ViewfinderCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader';

const OccupantDueRent = () => {

  const [loading, setLoading] = useState(false)
  const [duePayment, setDuePayment] = useState('')

  var today = new Date();
  var formattedToday = today.toISOString().split('T')[0];
  const [date, setDate] = useState(formattedToday);

  const onChange = (e) => {
    setDate(e.target.value)
  }

  const getDueRent = async () => {
    setLoading(true)
    await axiosInstance.get(`/rent-due/${date}`)
      .then(({ data }) => {
        setLoading(false)
        console.log("data", data.data)
        setDuePayment(data.data)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      })

  }

  return (
    <>
      <Breadcrumb pageName="Due Payment" />

      <div className="flex">
        <div className="w-full m-4">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div>
                <h3 className="flex font-medium text-black dark:text-white">
                  <CreditCardIcon className='h-6 w-6' /> Due For Payment
                </h3>
              </div>

              <div className='my-2 md:my-0'>
                {/* <Link to="/spaces">View Spaces</Link> */}
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row p-6.5">

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Date
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">

                  <input
                    type="date"
                    placeholder="Type your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={date}
                    onChange={onChange}
                  />

                </div>
              </div>

              <div className="md:mt-12">
                <Link
                  onClick={getDueRent}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium bg-primary text-white hover:bg-opacity-90 lg:px-3 xl:px-3"
                >
                  <MagnifyingGlassIcon className='w-5 h-5' />
                  Search
                </Link>
              </div>

            </div>


            <div className="max-w-full overflow-x-auto">

              {loading && <Loader />}
              {!loading && <>
                {duePayment !== 'No Due payment' &&
                  <div className="rounded p-4 shadow">
                    <h1 className="text-2xl text-center mb-4 font-bold">Over Due Payment</h1>


                    <div className="flex justify-between mb-2">
                      <span>Occupant:</span>
                      <span>{duePayment.occupant && duePayment.occupant.lastname + ' ' + duePayment.occupant.firstname}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Space:</span>
                      <span>{duePayment.space && duePayment.space.space_name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Expired:</span>
                      <span>{duePayment.to}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Last Payment:</span>
                      <span>&#x20A6;{duePayment.amount_paid}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Last Payment Date:</span>
                      <span className='text-left'>{duePayment.paid_at}</span>
                    </div>
                    <div className="text-center mt-2 mb-2">
                      <p>
                        <i>
                          This is your due payment report
                        </i>
                      </p>
                    </div>

                  </div>
                }

                {duePayment == 'No Due payment' &&
                  <div className="text-center mt-2 mb-2">
                    <p>
                      <i>
                        No Due payment report
                      </i>
                    </p>
                  </div>
                }
              </>}

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default OccupantDueRent