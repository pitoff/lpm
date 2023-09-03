import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ListBulletIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { PaginationLinks } from '../../components/PaginationLinks';


const OccupantsReport = () => {
    const [loading, setLoading] = useState(false)
    const [occupantList, setOccupantList] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [searchDetails, setSearchDetails] = useState({
        name: '',
        property: ''
    })
    const [meta, setMeta] = useState({});

    useEffect(() => {
        getOccupants()
        getProperties()
    }, [])

    const onPageClick = (link) => {
        getOccupants(link.url)
    }

    const getOccupants = async (url) => {
        url = url || '/properties-and-occupant-report'
        setLoading(true)
        await axiosInstance.post(url)
            .then(({ data }) => {
                console.log("data", data.data)
                setOccupantList(data.data.data)
                setMeta(data.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getProperties = async () => {
        setLoading(true)
        await axiosInstance.get(`property`)
            .then(({ data }) => {
                setLoading(false)
                setPropertyList(data.data)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const searchOccupant = async () => {
        setLoading(true)
        console.log("data", searchDetails)
        setOccupantList('')
        await axiosInstance.post(`/properties-and-occupant-report`, searchDetails)
            .then(({ data }) => {
                console.log("search data", data.data.data)
                setOccupantList(data.data.data)
                setMeta(data.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err.response.data.message)
                setLoading(false)
            })
    }


    return (
        <>
            <Breadcrumb pageName="Occupant Report" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div>
                        <h3 className="flex font-medium text-black dark:text-white">
                            <ListBulletIcon className='h-6 w-6' /> Occupant Report
                        </h3>
                    </div>

                    <div className='my-2 md:my-0'>
                        <Link to="/create-occupants">New Occupant</Link>
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row p-6.5">

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Name
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">

                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                value={searchDetails.name}
                                onChange={(e) => setSearchDetails({ ...searchDetails, name: e.target.value })}
                            />

                        </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Property
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <div className="relative z-20 bg-white dark:bg-form-input">

                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    value={searchDetails.property}
                                    onChange={(e) => setSearchDetails({ ...searchDetails, property: e.target.value })}
                                >
                                    <option value="">Select...</option>
                                    {propertyList.map((list) => (
                                        <option key={list.id} value={list.id}>{list.p_name}</option>
                                    ))}
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:mt-10">
                        <Link
                            onClick={searchOccupant}
                            className="inline-flex items-center justify-center 
                            rounded-md border border-primary py-2 px-4 text-center 
                            font-medium bg-primary text-white hover:bg-opacity-90 lg:px-3 xl:px-3"
                        >
                            <MagnifyingGlassIcon className='w-5 h-5' />
                            Search
                        </Link>
                    </div>

                </div>

                {loading && <Loader />}
                {!loading && <>

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
                                        Property
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Apartment
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Price
                                    </th>
                                    {/* <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {occupantList && occupantList.length > 0 ? occupantList.map((occupant, index) => (
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
                                            <p className="text-black dark:text-white">{occupant.p_name}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{occupant.space_name}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{occupant.space_price}</p>
                                        </td>

                                        {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <Link to={`/create-occupants/${occupant.id}`} className="hover:text-primary">
                                                    <PencilSquareIcon
                                                        onClick={() => handleUpdate(occupant)}
                                                        className='w-6 h-6 text-success'
                                                    />

                                                </Link>
                                                <button className="hover:text-primary">
                                                    <TrashIcon
                                                    onClick={() => handleRemove(occupant.id)}
                                                    className='w-6 h-6 text-danger'
                                                    />
                                                </button>
                                            </div>
                                        </td> */}
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
                        {occupantList.length > 0 &&
                                <PaginationLinks meta={meta} onPageClick={onPageClick} />
                            }
                    </div>

                </>}

            </div>
        </>
    )
}

export default OccupantsReport