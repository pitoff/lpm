import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import axiosInstance from '../../axios';
import { ReceiptPercentIcon, ListBulletIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader';

const RentHistoryNoAuth = () => {
    const [occupants, setOccupants] = useState([]);
    const [details, setDetails] = useState({
        occupant_id: '',
        year: ''
    })
    const [value, setValue] = useState('');

    useEffect(() => {
        getOccupants()
    }, [])

    var year = new Date()
    var curYear = year.getFullYear()
    var years = []
    for (let i = 2020; i <= curYear; i++) {
        years.push({ id: i })
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const getOccupants = async () => {
        await axiosInstance.get(`occupants`)
            .then(({ data }) => {
                setOccupants(data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const onSearch = (item) => {
        setValue(item)
    }

    const getHistory = async () => {

    }

    return (
        <>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

                    <h2 className="mb-9 text-2xl font-bold text-center text-black dark:text-white sm:text-title-xl2">
                        Rent Payment History
                    </h2>

                    <form onSubmit={getHistory}>
                        <div className="mb-4">

                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Name
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">

                                <input
                                    type="text"
                                    placeholder="Type your name"
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

                            <div className={value ? `border-grey border-2` : ''}>
                                {occupants && occupants.filter(item => {
                                    const searchItem = value.toLowerCase()
                                    const fullname = item.fullname.toLowerCase()
                                    return searchItem && fullname.includes(searchItem) && fullname !== searchItem
                                }).map((occupant) => (
                                    <div className='suggestion'
                                        key={occupant.id}
                                        onClick={() => {
                                            onSearch(occupant.fullname)
                                            setDetails({ ...details, occupant_id: occupant.id })
                                        }}
                                    >{occupant.fullname}</div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10">

                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Year
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">

                                <select
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    value={details.year}
                                    required
                                    onChange={(e) => setDetails({ ...details, year: e.target.value })}
                                >
                                    <option value="">Select...</option>
                                    {years.map(yr => (<option key={yr.id} value={yr.id}>
                                        {yr.id}
                                    </option>))}

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

                        <div className='flex justify-center'>
                            <Link
                                to="#"
                                // onClick={handlePaymentHistory}
                                className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-primary hover:text-white lg:px-4 xl:px-4"
                            >
                                <ListBulletIcon className='w-6 h-6 hover:white' />
                                Generate Payment History
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default RentHistoryNoAuth