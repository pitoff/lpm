import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import axiosInstance from '../../axios';
import { ReceiptPercentIcon, PrinterIcon, EyeIcon, ListBulletIcon, CreditCardIcon, ViewfinderCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader';

const DueRent = () => {

  const [loading, setLoading] = useState(false)
  const [duePaymentList, setDuePaymentList] = useState([])

  var today = new Date();
  // Format the date as desired (YYYY-MM-DD)
  var formattedToday = today.toISOString().split('T')[0];
  const [date, setDate] = useState(formattedToday);

  const onChange = (e) => {
    setDate(e.target.value)
  }

  const getDueRent = async () => {
    console.log("date", date)
    setLoading(true)
    await axiosInstance.get(`/rent-due/${date}`)
      .then(({ data }) => {
        setLoading(false)
        console.log("data", data.data)
        setDuePaymentList(data.data)
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
                  Select Date
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
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      SN
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Occupant
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Property
                    </th>
                    {/* <th className="min-w-[210px] py-4 px-4 font-medium text-black dark:text-white">
                      Space
                    </th> */}
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Expired
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Last Payment Date
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                {loading && <Loader />}
                {!loading &&
                  <tbody>
                    {duePaymentList && duePaymentList.length > 0 ? duePaymentList.map((list, index) => (
                      <tr key={list.id}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          {index + 1}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {list.occupant.lastname + ' ' + list.occupant.firstname}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{list.property.p_name}</p>
                        </td>
                        {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{property.p_desc}</p>
                        </td> */}
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{list.to}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{list.paid_at}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Link to="" className="hover:text-primary">
                              <EyeIcon

                                className='w-6 h-6 text-primary'
                              />

                            </Link>

                          </div>
                        </td>
                      </tr>
                    )) : 
                        <tr>
                          <td className="text-center" colSpan={5}>No records to display</td>
                        </tr>
                    }
                  </tbody>
                }
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default DueRent