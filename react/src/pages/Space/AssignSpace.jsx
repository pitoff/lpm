import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';
import './Assign.css';

const AssignSpace = () => {

    const [propertyList, setPropertyList] = useState([]);
    const [occupants, setOccupants] = useState([]);
    const [propertyImagePreview, setPropertyImagePreview] = useState("");
    const [value, setValue] = useState('');
    const [spaceList, setSpaceList] = useState([]);
    const [assignData, setAssignData] = useState({
        user_id: '',
        property_id: '',
        space_id: ''
    });

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProperties()
        getOccupants()
    }, [])

    const getOccupants = async () => {
        await axiosInstance.get(`occupant`)
            .then(({ data }) => {
                console.log("occupants", data.data)
                setOccupants(data.data)
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

    const getPropertySpaces = async (id) => {
        await axiosInstance.get(`empty-spaces/${id}`)
        .then(({data}) => {
            console.log("property spaces", data.data)
            setSpaceList(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onSearch = (item) => {
        setValue(item)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        console.log("assign data", assignData)
        await axiosInstance.post(`assign-space`, assignData)
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setValue('')
            setAssignData({
                user_id: '',
                property_id: '',
                space_id: ''
            })
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <Breadcrumb pageName="Assign Apartment" />

            <div className="flex">
                <div className="w-full m-4">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <div>
                                <h3 className="flex font-medium text-black dark:text-white">
                                    <PencilSquareIcon className='h-6 w-6' /> Assign Apartment to Occupant
                                </h3>
                            </div>

                            <div className='my-2 md:my-0'>
                                <Link to="/spaces">View Apartments</Link>
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
                                                Select Occupant
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <input
                                                    type="text"
                                                    placeholder="Search Occupant"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    value={value}
                                                    onChange={onChange}
                                                />

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

                                            <div className={value ? `border-solid border-2` : ''}>
                                                {occupants && occupants.filter(item => {
                                                    const searchItem = value.toLowerCase()
                                                    const fullname = item.fullname.toLowerCase()
                                                    return searchItem && fullname.includes(searchItem) && fullname !== searchItem
                                                }).map((occupant) => (
                                                    <div className='suggestion'
                                                        key={occupant.id}
                                                        onClick={() => {
                                                            onSearch(occupant.fullname)
                                                            setAssignData({...assignData, user_id:occupant.id})
                                                        }}
                                                    >{occupant.fullname}</div>
                                                ))}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Property
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={assignData.property_id}
                                                    onChange={(e) => {
                                                        getPropertyImage(e.target.value)
                                                        getPropertySpaces(e.target.value)
                                                        setAssignData({...assignData, property_id: e.target.value})
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
                                                    value={assignData.space_id}
                                                    onChange={(e) => {
                                                        setAssignData({...assignData, space_id: e.target.value})
                                                    }}
                                                >
                                                    <option value="">Select...</option>
                                                    {spaceList.map((list) => (
                                                        <option key={list.id} value={list.id}>{list.space_name} ({list.space_description})</option>
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

export default AssignSpace