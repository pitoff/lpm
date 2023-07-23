import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import DefaultLayout from '../layout/DefaultLayout';
import axiosInstance from '../axios';
import { PhotoIcon } from '@heroicons/react/24/outline';

const Profile = () => {

  const [occupantData, setOccupantData] = useState({})

  useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = async () => {
    await axiosInstance.get(`/profile-details`)
      .then(({ data }) => {
        console.log("data", data.data)
        setOccupantData(data.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="flex">
        <div className="w-full m-4">

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <div className='m-3'>
              <h3 className="flex font-bold text-black dark:text-white">Personal Information</h3>
            </div>

            <div className="flex flex-col md:flex-row m-5">

              <div className='flex md:w-1/2'>
                {occupantData.occupant && occupantData.occupant.image && (
                  <img
                    src={import.meta.env.VITE_UPLOAD_URL + occupantData.occupant.image}
                    alt="No occupant Img..."
                    className="w-32 h-32 object-cover rounded-full shadow"
                  />
                )}
                {occupantData.occupant && occupantData.occupant.image == '' && (
                  <span className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100">
                    <PhotoIcon className="w-8 h-8" />
                  </span>
                )}
              </div>

              <div className='flex flex-col rounded p-4 shadow md:w-1/2'>

                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Fullname:</span>
                  <span>{occupantData.user && occupantData.user.lastname + ' ' + occupantData.user.firstname}</span>
                </div>
                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Email:</span>
                  <span>{occupantData.user && occupantData.user.email}</span>
                </div>
                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Phone No.:</span>
                  <span>{occupantData.occupant && occupantData.occupant.phone_no}</span>
                </div>
                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Gender:</span>
                  <span>{occupantData.occupant && occupantData.occupant.gender}</span>
                </div>
                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Marital Status:</span>
                  <span>{occupantData.occupant && occupantData.occupant.marital_status}</span>
                </div>
                <div className="flex justify-between mb-2 shadow">
                  <span className='font-bold'>Year In:</span>
                  <span>{occupantData.occupant && occupantData.occupant.year_in}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className='font-bold'>Year Out:</span>
                  <span>{occupantData.occupant && occupantData.occupant.year_out}</span>
                </div>

              </div>
            </div>

            <div className='mt-5'>
              <div className='m-3'>
                <h3 className="flex font-bold text-black dark:text-white">My Apartment</h3>
              </div>

              {occupantData.space && occupantData.space.length > 0 && occupantData.space.map((data) => (
                <div className="flex flex-col md:flex-row m-5 shadow">

                  <div className='flex items-center px-18 md:w-1/2'>
                    {data.property && (
                      <img
                        src={import.meta.env.VITE_UPLOAD_URL + data.property.p_image}
                        alt="No property Img..."
                        className="w-48 h-48 object-cover rounded shadow"
                      />
                    )}
                    {data.property && data.property.p_image == '' && (
                      <span className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100">
                        <PhotoIcon className="w-8 h-8" />
                      </span>
                    )}
                  </div>

                  <div className='flex flex-col rounded p-4 shadow md:w-1/2'>

                    <div className="flex flex-col justify-between mb-2 shadow">
                      <span className='font-bold'>Property</span>
                      <span>{data.property.p_name}</span>
                    </div>
                    <div className="flex flex-col justify-between mb-2 shadow">
                      <span className='font-bold'>Apartment</span>
                      <span>{data.space.space_name}</span>
                    </div>
                    <div className="flex flex-col justify-between mb-2 shadow">
                      <span className='font-bold'>Description</span>
                      <span>{data.space.space_description}</span>
                    </div>
                    <div className="flex flex-col justify-between mb-2">
                      <span className='font-bold'>Amount</span>
                      <span>&#x20A6;{data.space.space_price}</span>
                    </div>
                    

                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </>
  );
};

export default Profile;
