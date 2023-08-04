import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../../axios';
import Loader from '../../components/Loader/Loader';
import { ForwardIcon, InboxArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';

const RentReceipt = () => {
    const { id } = useParams();
    const [receipt, setReceipt] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getReceipt()
    }, [])

    const getReceipt = async () => {
        setLoading(true)
        await axiosInstance.get(`/rent-receipt/${id}`)
            .then(({ data }) => {
                setLoading(false)
                console.log("data", data.data)
                setReceipt(data.data)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Rent Receipt" />

            {loading && <Loader />}
            {!loading &&
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-start-2 col-span-4">
                        <div className="rounded p-4 shadow">
                            <h1 className="text-2xl text-center mb-4 font-bold">{receipt.property && receipt.property.p_name}</h1>
                            <div className="flex justify-between mb-2">
                                <span>Occupant:</span>
                                <span>{receipt.occupant && receipt.occupant.lastname + ' ' + receipt.occupant.firstname}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Space:</span>
                                <span>{receipt.space && receipt.space.space_name}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Amount:</span>
                                <span>&#x20A6;{receipt.space && receipt.space.space_price}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Description:</span>
                                <span className='text-right'>{receipt.space && receipt.space.space_description}</span>
                            </div>

                            <div className="flex justify-between mt-2 mb-2">
                                <span>Amount Paid:</span>
                                <span>&#x20A6;{receipt && receipt.amount_paid}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>From:</span>
                                <span>{receipt && receipt.from}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>To:</span>
                                <span>{receipt && receipt.to}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Paid At:</span>
                                <span>{receipt && receipt.paid_at}</span>
                            </div>
                            <div className="text-center mt-2 mb-2">
                                <p>
                                    <i>
                                        This receipt is issued in respect to the rent you paid on {receipt && receipt.paid_at}
                                    </i>
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between mt-5'>
                            <Link
                                to="#"
                                className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-4 xl:px-4"
                            >
                                <PrinterIcon className='w-6 h-6' />
                                Print
                            </Link>
                            <Link
                                to="#"
                                className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-4 xl:px-4"
                            >
                                <InboxArrowDownIcon className='w-6 h-6 mr-1' />
                                Forward To Occupant
                            </Link>
                        </div>


                    </div>
                </div>
            }

            {/* <div className="container mx-auto px-4 py-8">
                <div className="border border-gray-400 rounded p-4 shadow">
                    <h1 className="text-3xl font-bold mb-4">Receipt</h1>
                    <div className="flex justify-between mb-2">
                        <span>Order No:</span>
                        <span>123456</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Date:</span>
                        <span>2023-07-20</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Customer:</span>
                        <span>John Doe</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Items:</span>
                        <ul className="list-disc list-inside">
                            <li>Product 1 - $10</li>
                            <li>Product 2 - $15</li>
                            <li>Product 3 - $20</li>
                        </ul>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Total:</span>
                        <span>$45</span>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Print Receipt
                    </button>
                </div>
            </div> */}
        </>
    )
}

export default RentReceipt