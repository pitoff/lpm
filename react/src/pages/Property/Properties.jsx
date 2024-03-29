import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ListBulletIcon, EyeIcon} from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

const Properties = () => {

    const [propertyList, setPropertyList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProperties()
    }, [])

    const getProperties = async() => {
        setLoading(true)
        await axiosInstance.get(`property`)
        .then(({data}) => {
            setLoading(false)
            console.log("prop data", data.data)
            setPropertyList(data.data)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const handleRemove = async (id) => {
        setLoading(true)
        await axiosInstance.delete(`property/${id}`)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                setPropertyList(propertyList.filter((data) => data.id !== id))
            }).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.status)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb pageName="My Properties" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div>
                        <h3 className="flex font-medium text-black dark:text-white">
                            <ListBulletIcon className='h-6 w-6' /> Property List
                        </h3>
                    </div>

                    <div className='my-2 md:my-0'>
                        <Link to="/create-property">Create New Property</Link>
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
                                    Property
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Type
                                </th>
                                <th className="min-w-[210px] py-4 px-4 font-medium text-black dark:text-white">
                                    Description
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Spaces
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {loading && <Loader />}
                        {!loading &&
                            <tbody>
                                {propertyList && propertyList.map((property, index) => (
                                    <tr key={property.id}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            {index + 1}
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {property.p_name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{property.property_type_name}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{property.p_desc}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{property.num_of_space}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <Link to="" className="hover:text-primary">
                                                    <EyeIcon
                                                        // onClick={() => handleUpdate(occupant)}
                                                        className='w-6 h-6 text-primary'
                                                    />

                                                </Link>

                                                <Link to={`/property-edit/${property.id}`} className="hover:text-primary">
                                                    <PencilSquareIcon
                                                        className='w-6 h-6 text-success'
                                                    />

                                                </Link>
                                                <button className="hover:text-primary">
                                                    <TrashIcon
                                                        onClick={() => handleRemove(property.id)}
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
        </>
    )
}

export default Properties