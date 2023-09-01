import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

const Occupants = () => {
  const [loading, setLoading] = useState(false)
  const [occupantList, setOccupantList] = useState([]);

  useEffect(() => {
    getOccupants()
  }, [])

  const getOccupants = async () => {
    setLoading(true)
    await axiosInstance.get(`properties-and-occupant`)
      .then(({ data }) => {
        let PropertyAndOccupantsArr = data.data

        const groupData = PropertyAndOccupantsArr.reduce((result, obj) => {
          const key = obj.p_name
          if (!result[key]) {
            result[key] = []
          }

          result[key].push(obj)
          return result
        }, [])
        setOccupantList(groupData)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleUpdate = async (pType) => {
    // setData({
    //   id: pType.id,
    //   name: pType.name,
    //   description: pType.description
    // })
  }

  const handleRemove = async (id) => {
    // setLoading(true)
    // await axiosInstance.delete(`property-type/${id}`)
    //   .then((res) => {
    //     setLoading(false)
    //     toast.success(res.data.message)
    //     setPropertyTypes(propertyTypes.filter((type) => type.id !== id))
    //   }).catch((err) => {
    //     setLoading(false)
    //     console.log(err)
    //   })
  }

  return (
    <>
      <Breadcrumb pageName="Occupants" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <div>
            <h3 className="flex font-medium text-black dark:text-white">
              <ListBulletIcon className='h-6 w-6' /> Occupant List
            </h3>
          </div>

          <div className='my-2 md:my-0'>
            <Link to="/create-occupants">Create Occupant</Link>
          </div>
        </div>

        {loading && <Loader />}
        {!loading && <>
          {
            Object.entries(occupantList).map(([headings, items], index) => (
              <>
                <div className="max-w-full text-center mt-6 mb-1"><strong>{headings.toUpperCase()}</strong></div>

                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                          SN
                        </th>
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                          Fullname
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                          Phone
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                          Space
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                          Price
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.length > 0 ? items.map((occupant, index) => (
                        <tr>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {index + 1}
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                              {occupant.lastname} {occupant.firstname}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{occupant.phone_no}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{occupant.space_name}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{occupant.space_price}</p>
                          </td>

                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                              <Link to={`/create-occupants/${occupant.id}`} className="hover:text-primary">
                                <PencilSquareIcon
                                  onClick={() => handleUpdate(occupant)}
                                  className='w-6 h-6 text-success'
                                />

                              </Link>
                              {/* <button className="hover:text-primary">
                                <TrashIcon
                                  onClick={() => handleRemove(occupant.id)}
                                  className='w-6 h-6 text-danger'
                                />
                              </button> */}

                            </div>
                          </td>
                        </tr>
                      )) : <tr>
                        <td colSpan={7} className='text-center'>
                          <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-2">

                            <div className="w-full">
                              <h5 className="mb-3 font-semibold text-[#9D5425]">
                                No Occupant found!
                              </h5>

                            </div>
                          </div>
                        </td>
                      </tr>}
                    </tbody>

                  </table>
                </div>
              </>
            ))
          }
        </>}

      </div>
    </>
  )
}

export default Occupants