import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ExclamationTriangleIcon, CreditCardIcon, CheckBadgeIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';

const CreatePropertyType = () => {

    const [propertyTypes, setPropertyTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        getPropertyTypes()
    }, [])

    const getPropertyTypes = async () => {
        setLoading(true)
        await axiosInstance.get(`property-type`)
            .then(({ data }) => {
                setLoading(false)
                console.log(data)
                setPropertyTypes(data.data)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        console.log("data", data)
        setLoading(true)
        if(data.id){
            await axiosInstance.put(`property-type/${data.id}`, data)
            .then(({ data }) => {
                setLoading(false)
                toast.success(data.message)
                const updatedList = propertyTypes.map((type) => {
                    if(type.id === data.data.id){
                        const updated = {
                            ...type,
                            name: data.data.name,
                            description: data.data.description
                        }
                        return updated
                    }
                    return type
                })
                setPropertyTypes(updatedList)
                setData({
                    id: "",
                    name: "",
                    description: ""
                })
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
        }else{
            await axiosInstance.post(`property-type`, data)
            .then(({ data }) => {
                setLoading(false)
                toast.success(data.message)
                const newTypes = [...propertyTypes]
                newTypes.push(data.data)
                setPropertyTypes(newTypes)
                setData({
                    name: "",
                    description: ""
                })
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
        }
        
    }

    const handleUpdate = async(pType) => {
        setData({
            id: pType.id,
            name: pType.name,
            description: pType.description
        })
    }

    const handleRemove = async (id) => {
        setLoading(true)
        await axiosInstance.delete(`property-type/${id}`)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                setPropertyTypes(propertyTypes.filter((type) => type.id !== id))
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Property Type" />

            <div className="flex flex-col-reverse md:flex-row gap-6">
                <div className="md:w-1/2">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white text-center">
                                Create property type
                            </h3>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="p-6.5">

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="property type"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="description"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={data.description}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                    />
                                </div>

                                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="md:w-1/2">
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                            Property Type
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Description
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {loading && <Loader />}
                                {!loading &&
                                    <tbody>
                                        {propertyTypes && propertyTypes.map((pType) => (
                                            <tr>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {pType.name}
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">{pType.description}</p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <div className="flex items-center space-x-3.5">
                                                        <button className="hover:text-primary">
                                                            <PencilSquareIcon 
                                                                onClick={() => handleUpdate(pType)}
                                                                className='w-6 h-6 text-success' 
                                                            />

                                                        </button>
                                                        <button className="hover:text-primary">
                                                            <TrashIcon
                                                                onClick={() => handleRemove(pType.id)}
                                                                className='w-6 h-6 text-danger'
                                                            />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

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

export default CreatePropertyType