import React, { Fragment, useRef, useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, TrashIcon, ExclamationTriangleIcon, CreditCardIcon, CheckBadgeIcon, XMarkIcon, EyeIcon, PowerIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios.js';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import { Dialog, Transition } from '@headlessui/react'

const PaymentMethodSetup = () => {

    const [paymentMethods, setPaymentMethods] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        bank: "",
        acc_number: "",
        acc_name: ""
    })
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        getPaymentMethods()
    }, [])

    const getPaymentMethods = async () => {
        setLoading(true)
        await axiosInstance.get(`payment-method`)
            .then(({ data }) => {
                setLoading(false)
                console.log("methods data", data)
                setPaymentMethods(data.data)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        console.log("data", data)
        setLoading(true)
        if (data.id) {
            await axiosInstance.put(`payment-method/${data.id}`, data)
                .then(({ data }) => {
                    setLoading(false)
                    toast.success(data.message)
                    const updatedList = paymentMethods.map((method) => {
                        if (method.id === data.data.id) {
                            const updated = {
                                ...method,
                                bank: data.data.bank,
                                acc_name: data.data.acc_name,
                                acc_number: data.data.acc_number
                            }
                            return updated
                        }
                        return method
                    })
                    setPaymentMethods(updatedList)
                    setData({
                        id: "",
                        bank: "",
                        acc_name: "",
                        acc_number: ""
                    })
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
        } else {
            await axiosInstance.post(`payment-method`, data)
                .then(({ data }) => {
                    setLoading(false)
                    toast.success(data.message)
                    const newMethods = [...paymentMethods]
                    newMethods.push(data.data)
                    setPaymentMethods(newMethods)
                    setData({
                        id: "",
                        bank: "",
                        acc_name: "",
                        acc_number: ""
                    })
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
        }

    }

    const handleUpdate = async (method) => {
        setData({
            id: method.id,
            bank: method.bank,
            acc_name: method.acc_name,
            acc_number: method.acc_number
        })
    }

    const handleToggle = async (id) => {
        setLoading(true)
        await axiosInstance.patch(`/toggle-payment-method/${id}`)
            .then((res) => {
                setLoading(false)
                getPaymentMethods()
            }).catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false)
                console.log(err)
            })
    }

    const handleRemove = async (id) => {
        setLoading(true)
        await axiosInstance.delete(`payment-method/${id}`)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb pageName="Payment Method" />

            <div className="flex flex-col-reverse md:flex-row gap-6">
                <div className="md:w-1/2">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white text-center">
                                Create payment method
                            </h3>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="p-6.5">

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Bank
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Bank name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={data.bank}
                                        onChange={(e) => setData({ ...data, bank: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Account number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={data.acc_number}
                                        onChange={(e) => setData({ ...data, acc_number: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Account name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={data.acc_name}
                                        onChange={(e) => setData({ ...data, acc_name: e.target.value })}
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
                                        <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white">
                                            Bank
                                        </th>
                                        <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                                            Account Name
                                        </th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                            Account No.
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {loading && <Loader />}
                                {!loading &&
                                    <tbody>
                                        {paymentMethods && paymentMethods.map((method) => (
                                            <tr>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {method.bank}
                                                    </p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {method.acc_name}
                                                    </p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {method.acc_number}
                                                    </p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <div className="flex items-center space-x-3.5">
                                                        <button className="hover:text-primary">
                                                            <PencilSquareIcon
                                                                onClick={() => handleUpdate(method)}
                                                                className='w-6 h-6 text-success'
                                                            />
                                                        </button>
                                                        <button className="hover:text-primary">
                                                            <PowerIcon
                                                                onClick={() => handleToggle(method.id)}
                                                                className={method.is_active == 0 ? 'w-6 h-6 text-danger' : 'w-6 h-6 text-success'}
                                                            />
                                                            {/* {method.is_active == 0 ? 'Inactive' : 'Active'} */}
                                                        </button>
                                                        <button className="hover:text-primary">
                                                            <TrashIcon
                                                                // onClick={() => handleRemove(method.id)}
                                                                onClick={() => setOpen(!open)}
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

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <TrashIcon className="h-6 w-6 text-danger" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Delete Method
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to remove payment method?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-danger px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => handleRemove(method.id)}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}

export default PaymentMethodSetup