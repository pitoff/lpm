import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';

const CreateRent = () => {

    const [loading, setLoading] = useState(false)
    const [propertyList, setPropertyList] = useState([]);
    const [occupant, setOccupant] = useState([]);
    const [spaceList, setSpaceList] = useState([]);
    const navigate = useNavigate();
    const [rentData, setRentData] = useState({
        property_id: '',
        space_id: '',
        occupant_id: '',
        amount_paid: '',
        from: '',
        paid_at: '',
    })

    useEffect(() => {
        getProperties()
    }, [])

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

    const getOccupantOfSpace = async (id) => {
        await axiosInstance.get(`/occupant-space/${id}`)
            .then(({ data }) => {
                console.log("occupant", data.data)
                setOccupant(data.data)
                setRentData({ ...rentData, occupant_id: data.data.id, space_id: id })
            }).catch((err) => {
                console.log(err)
            })
    }

    // const onSpaceChange = (id) => {
    //     getOccupantOfSpace(id)
    //     setRentData({...rentData, space_id:id})
    // }

    const getPropertySpaces = async (id) => {
        await axiosInstance.get(`/property-spaces/${id}`)
            .then(({ data }) => {
                console.log("property spaces", data.data)
                setSpaceList(data.data)
            }).catch((err) => {
                console.log(err)
            })
    }


    const handleSave = async (e) => {
        e.preventDefault()
        console.log("rent data", rentData)
        setLoading(true)
        await axiosInstance.post(`/create-paid-rent`, rentData)
            .then(({data}) => {
                setLoading(false)
                toast.success(data.message)
                navigate('/view-paid-rent')
            }).catch((err) => {
                setLoading(false)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Create Rent" />

            <div className="flex">
                <div className="w-full m-4">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <div>
                                <h3 className="flex font-medium text-black dark:text-white">
                                    <PencilSquareIcon className='h-6 w-6' /> Create Paid Rent
                                </h3>
                            </div>

                            <div className='my-2 md:my-0'>
                                <Link to="/spaces">Due Rent</Link>
                            </div>
                        </div>
                        {loading && <Loader />}
                        {!loading &&
                            <form onSubmit={handleSave}>

                                <div className="p-6.5">

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Property
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={rentData.property_id}
                                                    onChange={(e) => {
                                                        setRentData({ ...rentData, property_id: e.target.value })
                                                        getPropertySpaces(e.target.value)
                                                    }}
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

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Space
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={rentData.space_id}
                                                    onChange={(e) => {
                                                        getOccupantOfSpace(e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select...</option>

                                                    {spaceList.map((list) => (
                                                        <option key={list.id} value={list.id}>{list.space_name} - ({list.space_price})</option>
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

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Occupant
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <input
                                                    type="text"
                                                    placeholder="Occupant"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    value={occupant.lastname ? (occupant.lastname + ' ' + occupant.firstname) : ''}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Amount Paid
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <input
                                                    type="text"
                                                    placeholder="Amount"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    value={rentData.amount_paid}
                                                    onChange={(e) => setRentData({...rentData, amount_paid:e.target.value})}
                                                />
                                            </div>

                                        </div>

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                From
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <input
                                                    type="date"
                                                    placeholder="Amount"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    value={rentData.from}
                                                    onChange={(e) => setRentData({...rentData, from:e.target.value})}
                                                />
                                            </div>

                                        </div>

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Date Paid
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <input
                                                    type="date"
                                                    placeholder="Amount"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    value={rentData.paid_at}
                                                    onChange={(e) => setRentData({...rentData, paid_at:e.target.value})}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                    <button type='submit' className="flex justify-center rounded bg-primary px-4 py-2 font-medium text-gray">
                                        Save
                                    </button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateRent