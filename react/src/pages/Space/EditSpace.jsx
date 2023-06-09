import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify'

const EditSpace = () => {

    const [propertyList, setPropertyList] = useState([]);
    const [spaceStatus, setSpaceStatus] = useState([]);
    const [propertyImagePreview, setPropertyImagePreview] = useState("");
    const { id } = useParams()
    const navigate = useNavigate()

    const [spaceData, setSpaceData] = useState({
        // property_id: '',
        space_name: '',
        space_description: '',
        space_price: '',
        space_status: '',
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProperties()
        getSpaceStatus()
        if (id) {
            setLoading(true)
            axiosInstance.get(`/space/${id}`)
                .then(({ data }) => {
                    console.log("data", data)
                    setSpaceData(data.data)
                    getPropertyImage(data.data.property_id)
                    setLoading(false)
                })
        }
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

    const getSpaceStatus = async() => {
        await axiosInstance.get(`space-status`)
        .then((res) => {
            console.log("status", res.data.data)
            setSpaceStatus(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        console.log("space data", spaceData)
        await axiosInstance.patch(`space/${id}`, spaceData).then(({data}) => {
                setLoading(false)
                toast.success(data.message);
                navigate(`/property-spaces/${data.data.property_id}/${data.data.property}`)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            });

    }

    const getPropertyImage = async (id) => {
        if (id) {
            await axiosInstance.get(`property/${id}`)
                .then(({ data }) => {
                    console.log('image data', data)
                    setPropertyImagePreview(data.data.image_url)
                }).catch(() => {

                })
        }else{
            setPropertyImagePreview("")
        }

    }

    return (
        <>
            <Breadcrumb pageName="Edit Space" />

            <div className="flex">
                <div className="w-full m-4">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <div>
                                <h3 className="flex font-medium text-black dark:text-white">
                                    <PencilSquareIcon className='h-6 w-6' /> Edit Space
                                </h3>
                            </div>

                            <div className='my-2 md:my-0'>
                                <Link to="/spaces">View Spaces</Link>
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
                                            {propertyImagePreview && (
                                                <img
                                                    src={propertyImagePreview}
                                                    alt=""
                                                    className="w-32 h-32 object-cover"
                                                />
                                            )}
                                            {!propertyImagePreview && (
                                                <span className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100">
                                                    <PhotoIcon className="w-8 h-8" />
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Property
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={spaceData.property_id}
                                                    onChange={(e) => {
                                                        setSpaceData({ ...spaceData, property_id: e.target.value })
                                                        getPropertyImage(e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select...</option>
                                                    {propertyList.map((list) => (
                                                        <option key={list.id} value={list.id}>{list.p_name} ({list.p_desc})</option>
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

                                    </div> */}

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Space name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter space name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={spaceData.space_name}
                                                onChange={(e) => setSpaceData({ ...spaceData, space_name: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Description
                                            </label>
                                            <textarea
                                                rows={1}
                                                placeholder="Space description"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={spaceData.space_description}
                                                onChange={(e) => setSpaceData({ ...spaceData, space_description: e.target.value })}
                                            ></textarea>
                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Amount
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Amount for space"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                value={spaceData.space_price}
                                                onChange={(e) => setSpaceData({ ...spaceData, space_price: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Space Status
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={spaceData.space_status}
                                                    onChange={(e) => setSpaceData({ ...spaceData, space_status: e.target.value })}
                                                >
                                                    <option value="">Select...</option>
                                                    {spaceStatus.map((status) => (
                                                        <option value={status.id} key={status.id}>{status.name}</option>
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

export default EditSpace