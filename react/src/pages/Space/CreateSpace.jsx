import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';
import { generate } from 'shortid';

const CreateSpace = () => {

    const [propertyList, setPropertyList] = useState([]);
    const [spaceStatus, setSpaceStatus] = useState([]);
    const [propertyImagePreview, setPropertyImagePreview] = useState("");
    const [propertyNumofSpace, setPropertyNumofSpace] = useState("");
    const [propertyId, setPropertyId] = useState({ property_id: "" });
    const navigate = useNavigate()

    const [spaceData, setSpaceData] = useState([{
        spaceRandomId: generate(),
        space_name: '',
        space_description: '',
        space_price: '',
        space_status: '',
    }]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProperties()
        getSpaceStatus()
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

    const getSpaceStatus = async () => {
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
        spaceData.forEach((element) => element.property_id = propertyId.property_id);
        console.log("space data", {spaces:spaceData})
        await axiosInstance.post(`space`, {spaces: spaceData})
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message);
                navigate('/spaces')
                console.log("res", res)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.response.data.message);
            });

    }

    const getPropertyImage = async (id) => {
        if (id) {
            await axiosInstance.get(`property/${id}`)
                .then(({ data }) => {
                    setPropertyImagePreview(data.data.image_url)
                    setPropertyNumofSpace(data.data.num_of_space)
                }).catch(() => {

                })
        } else {
            setPropertyImagePreview("")
        }

    }

    return (
        <>
            <Breadcrumb pageName="Create Property Space" />

            <div className="flex">
                <div className="w-full m-4">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <div>
                                <h3 className="flex font-medium text-black dark:text-white">
                                    <PencilSquareIcon className='h-6 w-6' /> Create Space
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

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Property
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={propertyId.property_id}
                                                    onChange={(e) => {
                                                        setSpaceData([{
                                                            space_name: '',
                                                            space_description: '',
                                                            space_price: '',
                                                            space_status: '',
                                                        }])
                                                        setPropertyId({ ...propertyId, property_id: e.target.value })
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

                                    </div>

                                    {/* list of spaces */}

                                    {spaceData.map((space, index) => {
                                        return (
                                            <>
                                                <section key={space.spaceRandomId}>

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
                                                                onChange={(e) => {
                                                                    const space_name = e.target.value
                                                                    setSpaceData((currentSpace) => currentSpace.map(x => x.spaceRandomId === space.spaceRandomId ? { ...x, space_name } : x))
                                                                }}
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
                                                                onChange={(e) => {
                                                                    const space_description = e.target.value
                                                                    setSpaceData((currentSpace) => currentSpace.map(x => x.spaceRandomId === space.spaceRandomId ? { ...x, space_description } : x))
                                                                }}
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
                                                                onChange={(e) => {
                                                                    const space_price = e.target.value
                                                                    setSpaceData((currentSpace) => currentSpace.map(x => x.spaceRandomId === space.spaceRandomId ? { ...x, space_price } : x))
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="w-full xl:w-1/2">
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Space Status
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                                    value={spaceData.space_status}
                                                                    onChange={(e) => {
                                                                        const space_status = e.target.value
                                                                        setSpaceData((currentSpace) => currentSpace.map(x => x.spaceRandomId === space.spaceRandomId ? { ...x, space_status } : x))
                                                                    }}
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

                                                    <div className="flex flex-row justify-end"
                                                    // style={{backgroundColor:`red`}}
                                                    >
                                                        <div className='mr-1'>
                                                            {(propertyNumofSpace !== '') && (spaceData.length !== propertyNumofSpace) &&
                                                                <button type='button'
                                                                    className="flex justify-center rounded bg-success px-4 py-2 font-medium text-gray"
                                                                    onClick={() => {
                                                                        setSpaceData(currentSpace => [
                                                                            ...currentSpace, {
                                                                                spaceRandomId: generate(),
                                                                                space_name: '',
                                                                                space_description: '',
                                                                                space_price: '',
                                                                                space_status: '',
                                                                            }
                                                                        ])
                                                                    }}
                                                                >
                                                                    <PlusIcon className='h-4 w-4' />
                                                                </button>
                                                            }
                                                        </div>

                                                        <div className='ml-1'>
                                                            {spaceData.length > 1 &&
                                                                <button type='button'
                                                                    className="flex justify-center rounded bg-danger px-4 py-2 font-medium text-gray"
                                                                    onClick={() => setSpaceData(currentSpace => currentSpace.filter(x => x.spaceRandomId !== space.spaceRandomId))}
                                                                >
                                                                    <TrashIcon className='h-4 w-4' />
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>

                                                </section>
                                            </>
                                        )
                                    })}

                                    {/* end list of spaces */}

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

export default CreateSpace