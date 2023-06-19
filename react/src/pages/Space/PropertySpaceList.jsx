import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ListBulletIcon, EyeIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import { Link, useParams } from 'react-router-dom';

const PropertySpaceList = () => {
    const [spaceList, setSpaceList] = useState([])
    const [loading, setLoading] = useState(false)
    const { id, p_name } = useParams()

    useEffect(() => {
        getSpaces()
    }, [])

    const getSpaces = async () => {
        setLoading(true)
        await axiosInstance.get(`property-spaces/${id}`)
            .then((res) => {
                setLoading(false)
                console.log("res", res.data.data)
                setSpaceList(res.data.data)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Property Spaces" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div>
                        <h3 className="flex font-medium text-black dark:text-white">
                            <ListBulletIcon className='h-6 w-6' /> Spaces In {p_name}
                        </h3>
                    </div>

                    <div className='my-2 md:my-0'>
                        <Link to="/spaces">View Properties</Link>
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>

                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    SN
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Occupant
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Space
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Description
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Amount
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {loading && <Loader />}
                        {!loading &&
                            <tbody>
                                {spaceList.length > 0 ? spaceList.map((space, index) => (
                                    <tr key={space.id}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            {index + 1}
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">Dummy Occupant</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {space.space_name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{space.space_description}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{space.space_price}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{space.space_status_name}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <Link to={`/property-spaces/${space.id}`} className="hover:text-primary flex flex-row justify-between">
                                                    <EyeIcon
                                                        className='w-6 h-6 text-primary'
                                                    />

                                                </Link>

                                                <Link to={`/edit-space/${space.id}`} className="hover:text-primary">
                                                    <PencilSquareIcon
                                                        className='w-6 h-6 text-success'
                                                    />

                                                </Link>
                                                {/* <button className="hover:text-primary">
                                                    <TrashIcon

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
                                                    No Space found
                                                </h5>

                                            </div>
                                        </div>
                                    </td>
                                </tr>}

                            </tbody>

                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default PropertySpaceList