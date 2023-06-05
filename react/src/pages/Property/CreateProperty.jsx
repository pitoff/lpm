import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify'

const CreateProperty = () => {
    const [loading, setLoading] = useState(false)
    const [propertyTypes, setPropertyTypes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getPropertyTypeList()
        // if (id) {
        //   setLoading(true)
        //   axiosInstance.get(`/occupant/${id}`)
        //     .then(({ data }) => {
        //       console.log("data", data)
        //       setOccupantData(data.data)
        //       setLoading(false)
        //     })
        // }
    }, [])

    const [propertyData, setPropertyData] = useState({
        property_type_id: '',
        p_name: '',
        p_desc: '',
        num_of_space: '',
        p_state: '',
        p_city: '',
        p_address: '',
        image: '',
        image_url: ''
    })

    const getPropertyTypeList = async () => {
        await axiosInstance.get(`property-type`)
            .then(({ data }) => {
                console.log("res", data.data)
                setPropertyTypes(data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const onImageChange = (e) => {
        const file = e.target.files[0]
        //convert image to base64 string and send to back end
        const reader = new FileReader(); //read the file
        //  console.log(reader)
        reader.onload = () => {
            setPropertyData({
                ...propertyData, image: file, image_url: reader.result
            })
            e.target.value = ""
        }
        reader.readAsDataURL(file) //enable image display
    }

    const handleSave = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Breadcrumb pageName="New Property" />

            <div className="flex">
                <div className="w-full m-4">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <div>
                                <h3 className="flex font-medium text-black dark:text-white">
                                    <PencilSquareIcon className='h-6 w-6' /> Create New Property
                                </h3>
                            </div>

                            <div className='my-2 md:my-0'>
                                <Link to="/properties">View Properties</Link>
                            </div>
                        </div>
                        {loading && <Loader />}
                        {!loading &&
                            <form onSubmit={handleSave}>

                                <div className="p-6.5">

                                    <div className="col-span-6 sm:col-span-3 mb-4.5">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Property Image
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            {propertyData.image_url && (
                                                <img
                                                    src={propertyData.image_url}
                                                    alt=""
                                                    className="w-32 h-32 object-cover"
                                                />
                                            )}
                                            {!propertyData.image_url && (
                                                <span className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100">
                                                    <PhotoIcon className="w-8 h-8" />
                                                </span>
                                            )}
                                            <button type="button"
                                                className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm 
                                font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none 
                                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <input
                                                    type="file"
                                                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                                    onChange={onImageChange}
                                                />
                                                Select
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Property Type
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={propertyData.property_type_id}
                                                    onChange={(e) => setPropertyData({ ...propertyData, property_type_id: e.target.value })}
                                                >
                                                    <option value="">Select...</option>
                                                    {propertyTypes.map((list) => (
                                                        <option key={list.id} value={list.id}>{list.name} ({list.description})</option>
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

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Property Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your property name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={propertyData.p_name}
                                                onChange={(e) => setPropertyData({ ...propertyData, p_name: e.target.value })}
                                            />
                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                No. of Space
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter No. of space"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={propertyData.num_of_space}
                                                onChange={(e) => setPropertyData({ ...propertyData, num_of_space: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Description
                                            </label>
                                            <textarea
                                                rows={1}
                                                placeholder="Property description"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            ></textarea>
                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select State
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    // value={occupantData.gender}
                                                    // onChange={(e) => setOccupantData({ ...occupantData, gender: e.target.value })}
                                                >
                                                    <option value="">Select...</option>
                                                    {/* {genderList.map((list) => (
                                                        <option key={list.id} value={list.value}>{list.label}</option>
                                                    ))} */}
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

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Property City"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={propertyData.p_city}
                                                onChange={(e) => setPropertyData({ ...propertyData, p_city: e.target.value })}
                                            />
                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Property Address
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Property address."
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={propertyData.p_address}
                                                onChange={(e) => setPropertyData({ ...propertyData, p_address: e.target.value })}
                                            />
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

export default CreateProperty