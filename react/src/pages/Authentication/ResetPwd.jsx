import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios.js';
import { useStateContext } from '../../context/ContextProvider.jsx';
import { toast } from 'react-toastify'
import { LinkIcon } from '@heroicons/react/24/outline';
import Loader from '../../components/Loader/Loader.jsx';

const ResetPwd = () => {

    const [resetData, setResetData] = useState({
        email: "",
    })
    const [loading, setLoading] = useState(false)

    const sendResetLink = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("data", resetData)
        await axiosInstance
            .post("/forgot-password", resetData)
            .then(({ data }) => {
                setLoading(false)
                toast.success(data.message)
                setResetData({ ...resetData, email: "" })
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                toast.error(err.response.data.message);
            });
    };

    return (
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

                <h2 className="mb-9 text-2xl font-bold text-center text-black dark:text-white sm:text-title-xl2">
                    Reset Password
                </h2>

                {loading && <Loader />}
                {!loading &&
                    <form onSubmit={sendResetLink}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={resetData.email}
                                    onChange={(e) => {
                                        setResetData({
                                            ...resetData,
                                            email: e.target.value,
                                        });
                                    }}
                                />

                                <span className="absolute right-4 top-4">
                                    <svg
                                        className="fill-current"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.5">
                                            <path
                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            {/* <input
                            type="submit"
                            value="Send Reset Link"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        /> */}

                            <button
                                className="inline-flex w-full items-center justify-center rounded-md border border-primary bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
                                type='submit'
                            >
                                <LinkIcon
                                    className='w-6 h-6 text-white'
                                />
                                Send Reset Link
                            </button>

                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                I know my Password?{' '}
                                <Link to="/auth/login" className="text-primary">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}

export default ResetPwd