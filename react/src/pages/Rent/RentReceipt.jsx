import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../../axios';
import Loader from '../../components/Loader/Loader';
import { InboxArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';
import './PrintReceipt.css';
import { useStateContext } from '../../context/ContextProvider';
import { toast } from 'react-toastify';

const RentReceipt = () => {
    const { currentUser } = useStateContext()
    let user = ''
    if (currentUser) {
        user = JSON.parse(currentUser)
    }
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

    const forwardReceipt = async() => {
        await axiosInstance.get(`/forward-receipt/${id}`)
            .then(({data}) => {
                setLoading(false)
                toast.success(data.message)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
                toast.error(err.response.data.message)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Rent Receipt" />

            {loading && <Loader />}
            {!loading &&
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-start-2 col-span-4">
                        <div className="rounded p-4 shadow" id='divToPrint'>
                            <h1 className="text-2xl text-center mb-4 font-bold">{receipt.property && receipt.property.p_name}</h1>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>Occupant:</span>
                                <span>{receipt.occupant && receipt.occupant.lastname + ' ' + receipt.occupant.firstname}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>Space:</span>
                                <span>{receipt.space && receipt.space.space_name}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>Amount:</span>
                                <span>&#x20A6;{receipt.space && receipt.space.space_price}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>Description:</span>
                                <span className='text-right'>{receipt.space && receipt.space.space_description}</span>
                            </div>

                            <div className="flex justify-between mt-2 mb-2" id='detail'>
                                <span>Amount Paid:</span>
                                <span>&#x20A6;{receipt && receipt.amount_paid}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>From:</span>
                                <span>{receipt && receipt.from}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>To:</span>
                                <span>{receipt && receipt.to}</span>
                            </div>
                            <div className="flex justify-between mb-2" id='detail'>
                                <span>Paid At:</span>
                                <span>{receipt && receipt.paid_at}</span>
                            </div>
                            <div className="text-center mt-4 mb-2" id='irT'>
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
                                onClick={() => window.print()}
                            >
                                <PrinterIcon className='w-6 h-6' />
                                Print
                            </Link>
                            {user && user.role == 1 &&
                                <Link
                                    to="#"
                                    className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-4 xl:px-4"
                                    onClick={forwardReceipt}
                                >
                                    <InboxArrowDownIcon className='w-6 h-6 mr-1' />
                                    Forward To Occupant
                                </Link>
                            }
                        </div>


                    </div>
                </div>
            }
        </>
    )
}

export default RentReceipt