import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { PencilSquareIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify'

const CreateOccupant = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const [occupantData, setOccupantData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_no: '',
    gender: '',
    marital_status: '',
    year_in: '',
    year_out: '',
    image: '',
    image_url: '',
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      axiosInstance.get(`/occupant/${id}`)
        .then(({ data }) => {
          console.log("data", data)
          setOccupantData(data.data)
          setLoading(false)
        })
    }
  }, [])

  const genderList = [
    { id: 1, label: "Male", value: "male" },
    { id: 2, label: "Female", value: "female" }
  ]

  const maritalStatusList = [
    { id: 1, label: "Single", value: "single" },
    { id: 2, label: "Married", value: "married" },
    { id: 3, label: "Divorced", value: "divorced" },
    { id: 4, label: "Widowed", value: " widowed" }
  ]

  var year = new Date()
  var curYear = year.getFullYear()
  var years = []
  for (let i = 2018; i <= curYear; i++) {
    years.push({ id: i })
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]
    //convert image to base64 string and send to back end
    const reader = new FileReader(); //read the file
    //  console.log(reader)
    reader.onload = () => {
      setOccupantData({
        ...occupantData, image: file, image_url: reader.result
      })
      e.target.value = ""
    }
    reader.readAsDataURL(file) //enable image display
  }

  const handleSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...occupantData };
    if (payload.image) {
      payload.image = payload.image_url
    }
    delete payload.image_url
    let res = null;

    if (id) {
      console.log("update payload", payload)
      res = axiosInstance.put(`occupant/${id}`, payload)
    } else {
      res = axiosInstance.post(`occupant`, payload)
    }
    res
      .then((res) => {
        setLoading(false)
        toast.success(res.data.message);
        navigate('/occupants')
        console.log("res", res)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      });
  }

  return (
    <>
      {id &&
        <Breadcrumb pageName="Edit Occupant" />
      }

      {!id &&
        <Breadcrumb pageName="New Occupant" />
      }

      <div className="flex">
        <div className="w-full m-4">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col md:flex-row md:justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div>
                {id &&
                  <h3 className="flex font-medium text-black dark:text-white">
                    <PencilSquareIcon className='h-6 w-6' /> Edit Occupant
                  </h3>
                }
                {!id &&
                  <h3 className="flex font-medium text-black dark:text-white">
                    <PencilSquareIcon className='h-6 w-6' /> Create New Occupant
                  </h3>
                }

              </div>

              <div className='my-2 md:my-0'>
                <Link to="/occupants">View Occupants</Link>
              </div>
            </div>
            {loading && <Loader />}
            {!loading &&
              <form onSubmit={handleSave}>

                <div className="p-6.5">

                  <div className="col-span-6 sm:col-span-3 mb-4.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Occupant Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      {occupantData.image_url && (
                        <img
                          src={occupantData.image_url}
                          alt=""
                          className="w-32 h-32 object-cover"
                        />
                      )}
                      {!occupantData.image_url && (
                        <span className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100">
                          <PhotoIcon className="w-8 h-8" />
                        </span>
                      )}
                      <button type="button"
                        className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm 
                                font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none 
                                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <input
                          type="file"
                          className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                          onChange={onImageChange}
                        />
                        Select
                      </button>
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={occupantData.firstname}
                        onChange={(e) => setOccupantData({ ...occupantData, firstname: e.target.value })}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={occupantData.lastname}
                        onChange={(e) => setOccupantData({ ...occupantData, lastname: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={occupantData.email}
                        onChange={(e) => setOccupantData({ ...occupantData, email: e.target.value })}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone No.
                      </label>
                      <input
                        type="text"
                        placeholder="Enter PhoneNo."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={occupantData.phone_no}
                        onChange={(e) => setOccupantData({ ...occupantData, phone_no: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Select Gender
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">

                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={occupantData.gender}
                          onChange={(e) => setOccupantData({ ...occupantData, gender: e.target.value })}
                        >
                          <option value="">Select...</option>
                          {genderList.map((list) => (
                            <option key={list.id} value={list.value}>{list.label}</option>
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

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Marital Status
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">

                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={occupantData.marital_status}
                          onChange={(e) => setOccupantData({ ...occupantData, marital_status: e.target.value })}
                        >
                          <option value="">Select...</option>
                          {maritalStatusList.map((list) => (
                            <option key={list.id} value={list.value}>{list.label}</option>
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
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Year In
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">

                        <select
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={occupantData.year_in}
                          onChange={(e) => setOccupantData({ ...occupantData, year_in: e.target.value })}
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

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Year Out
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">

                        <select
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={occupantData.year_out}
                          onChange={(e) => setOccupantData({ ...occupantData, year_out: e.target.value })}
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

export default CreateOccupant